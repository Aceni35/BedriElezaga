# CMS-Elmaz — Project Structure & Overview

A TypeScript / Node.js / Express REST API that powers a content-management system for "Komunalne djelatnosti Plav". It exposes endpoints for admins, clients, news articles, categories, tags, documents and monthly invoice documents, with JWT-based authentication, role/permission gating, file storage on Uploadcare, and transactional emails via Brevo.

---

## 1. Tech Stack

| Layer | Choice |
| --- | --- |
| Language | TypeScript (compiles to `dist/` with `tsc`, `target: es2016`, `module: commonjs`) |
| Runtime | Node.js |
| Web framework | Express 4 |
| Database | MongoDB (via Mongoose 8) |
| Auth | JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` for hashing |
| Validation | Zod schemas |
| File storage | Uploadcare (REST client) |
| Email | Brevo (`@getbrevo/brevo`) — transactional email API |
| Scheduling | `node-cron` (monthly invoice email job) |
| API docs | `swagger-autogen` + `swagger-ui-express` |
| Misc | `dotenv`, `cors`, `express-async-errors`, `http-status-codes`, `uuid`, `nanoid`, `axios` |

### Packages used (from `package.json`)

**Runtime dependencies**

- `@getbrevo/brevo` — Brevo transactional email SDK (password reset emails + invoice delivery).
- `@uploadcare/rest-client` — Deletes uploaded files (avatars, news images, documents) when records are removed.
- `axios` — HTTP client (available for outbound calls).
- `bcryptjs` — Password hashing & comparison on `Admin` and `Client` schemas.
- `cors` — Enables cross-origin requests (allow-all by default).
- `dotenv` — Loads `.env` (Mongo URI, JWT secret, Brevo & Uploadcare keys).
- `express` + `@types/express` — HTTP server & routing.
- `express-async-errors` — Lets async route handlers throw without explicit `try/catch`; errors flow into the central error handler.
- `express-async-handler` — Listed as a dependency (alternative async wrapper).
- `http-status-codes` — Symbolic HTTP status constants (e.g. `StatusCodes.OK`, `FORBIDDEN`).
- `jsonwebtoken` — Signs JWTs in the user models' `createJWT()` method, verifies them in `checkAuth` middleware.
- `mongoose` + `mongodb` — ODM and underlying driver.
- `nanoid`, `uuid` — Random ID generation (`uuid` is used to mint temporary passwords).
- `node-cron` — Schedules the recurring invoice-email task.
- `swagger-autogen` — Scans the codebase for `// #swagger.tags` / `#swagger.description` comments and produces `swagger-output.json`.
- `swagger-ui-express` — Serves the generated docs at `/api-docs`.
- `zod` — Request-body validation (admin, client, category, document, invoice, password schemas).
- `concurrently`, `rimraf`, `typescript` — Build tooling.

**Dev dependencies**

- `@types/cors`, `@types/swagger-ui-express` — Type definitions.
- `nodemon` — Restarts the compiled server on changes (used by `npm run serve`).

### npm scripts

- `npm run build` — `rimraf dist && npx tsc` (clean + compile).
- `npm start` — Builds, then runs `node dist/index.js`.
- `npm run serve` — Watches TypeScript with `tsc -w` and runs `nodemon dist/index.js` concurrently.
- `npm run swagger` — Regenerates `swagger-output.json` from in-code comments.

---

## 2. Top-level layout

```
CMS-Elmaz-main/
├── index.ts                  # Application entry point
├── swagger.ts                # Swagger autogen script
├── swagger-output.json       # Generated OpenAPI document
├── package.json
├── tsconfig.json
├── connectDB/
│   └── connect.ts            # mongoose.connect wrapper
├── controllers/              # Route handler logic (one file per resource)
├── routers/                  # Express routers (one per resource)
├── models/                   # Mongoose schemas / models
├── middleware/               # auth, admin check, error handler, 404
├── helpers/                  # Reusable functions, shared types, global type augmentation
├── errors/                   # Custom error classes
└── validators/               # Zod schemas per resource
```

---

## 3. Application Bootstrap (`index.ts`)

Order of operations:

1. `import 'express-async-errors'` — patches Express so thrown errors in async handlers reach the error middleware.
2. `cors()` and `express.json()` are mounted.
3. Swagger UI is served at `/api-docs` from `swagger-output.json`.
4. `emailCron()` starts the recurring invoice job.
5. Routers are mounted under `/api/v1`, layered by access level:
   - **Public** — `publicRouter`, `authRouter` (login, password reset).
   - **Authenticated (any user)** — `userRouter` is gated by `checkAuth`.
   - **Admin-only** — every other router (`tag`, `documents`, `admin`, `client`, `category`, `news`, `invoiceDocuments`, `dashboard`) is wrapped by `checkAuth, checkAdmin`.
6. `notFound` and `errorHandler` are mounted last.
7. `connect()` calls `connectDB(process.env.MONGO_URI)` and then `app.listen(3000)`.

---

## 4. Request Lifecycle

```
client ──► CORS ──► express.json ──► [router-specific middleware]
        ──► controller (validates with Zod, queries Mongo, calls helpers)
        ──► response  OR  thrown error ──► errorHandler
```

### Middleware (`middleware/`)

- **`authentication.ts` — `checkAuth`**: Reads `Authorization: Bearer <token>`, verifies with `JWT_SECRET`, attaches `{ userId }` to `req.user`. On failure throws `BadRequest`.
- **`adminCheck.ts` — `checkAdmin`**: Calls `userType(userId)`; if the user is a client it throws `ForbiddenError`. Used to restrict admin-only routers.
- **`handleError.ts` — `errorHandler`**: Special-cases Mongoose `ValidationError` (returns 400 with field-level messages) and otherwise responds with `err.statusCode || 500` and `err.details || null`.
- **`notFound.ts`**: Returns `404 { msg: "route not found 404" }` for unmatched routes.

### Custom errors (`errors/`)

- `custom-err.ts` — `CustomError` base class extending `Error` with a `statusCode`.
- `BadRequestError.ts` — Status 400, optional `details` payload (used to carry Zod field errors).
- `ForbiddenError.ts` — Status 403 (`StatusCodes.FORBIDDEN`).

Throw-style error handling: controllers `throw new BadRequest(...)` or `throw new ForbiddenError()` and rely on `express-async-errors` to forward to `errorHandler`.

---

## 5. Routing (`routers/`)

Each router is a thin wrapper that maps HTTP verbs to controller functions. All routers are mounted at `/api/v1`.

| File | Purpose | Notable routes |
| --- | --- | --- |
| `auth.ts` | Public auth | `POST /login`, `POST /forgotPassword` |
| `public.ts` | Unauthenticated read access | `/public/news`, `/public/singleNews/:id`, `/public/categories`, `/public/documents`, `/public/images` |
| `user.ts` | Self-service for any logged-in user | `POST /password`, `POST /newPassword`, `GET /me` |
| `admin.ts` | Admin CRUD + audit log | `/admin`, `/admin/:id`, `/adminChanges` |
| `client.ts` | Client CRUD | `/client`, `/client/:id` |
| `category.ts` | Category CRUD with breadcrumb | `/category`, `/singleCategory/:categoryId` |
| `tag.ts` | Tag CRUD | `/tag` |
| `news.ts` | News article CRUD + popular feed | `/news`, `/newsThisMonth`, `/singleNews/:id` |
| `documents.ts` | Document CRUD + stats | `/documents`, `/documents/stats`, `/document/:documentId` |
| `invoiceDocuments.ts` | Monthly invoice documents | `/invoiceDocuments`, `/invoiceDocument/:documentId` |
| `dashboard.ts` | Aggregated KPIs | `/getDashboard` |

---

## 6. Controllers (`controllers/`)

Controllers are the business logic. They:

1. Read `req.user` (set by `checkAuth`).
2. For admin actions, look up the calling admin and call `hasPermission(module, action, role, permissions)` — `super_admin` always passes, `admin` is checked against their per-module permission map.
3. Validate input with the relevant Zod schema (`safeParseAsync` for the password schema since it hashes asynchronously).
4. Run Mongoose queries.
5. For destructive operations on records that own files (avatars, news images, documents), call `fileDelete` / `filesDelete` to clean up Uploadcare storage.
6. Audit privileged admin actions with `saveChange(adminId, module, action)`, which writes to the `AdminAction` collection.
7. Respond with `StatusCodes.*` and a JSON body.

Highlighted modules:

- **`authenticate.ts` — `LogIn`**: Looks up the email in both `Admin` and `Client`, checks the regular password and (if `tempPassword.needsChange` is set and not expired) the temporary password. Returns a JWT plus a `needsPasswordChange` flag.
- **`brevoEmails.ts`** — `sendPasswordEmail` mints a UUID-based temp password (8 chars), hashes & stores it with a 15-minute expiry, and sends it via Brevo. `sendInvoice` is the helper used by the cron job.
- **`uploadcareFiles.ts`** — `fileDelete(id)` and `filesDelete(ids[])` wrap `@uploadcare/rest-client` to remove orphaned media when a record is deleted. The Uploadcare UUID is parsed out of stored URLs (`url.split('/')[3]`).
- **`cron.ts` — `emailCron`** — `cron.schedule("* * * * *", ...)` runs every minute: finds the unsent invoice for the current month/year, fetches all clients with `invoiceToEmail: true`, mails the invoice URL, then sets `sent = true` to prevent re-sending.
- **`dashboard.ts`** — Runs six count/aggregation queries in parallel via `Promise.all` to build a KPI summary: total/weekly news, total/weekly views, total clients, clients in the last 7 days.
- **`news.ts`** — Adds a `views` log entry (`saveView`) on single-article reads; supports search/filter (status, createdBy, tag, year/month), sort, and pagination on the listing endpoint.
- **`admin.ts`** — Includes `saveChange()` (audit logger) and `getAllAdminActions` (paginated audit feed). Re-used across other controllers to record admin activity.

---

## 7. Data Models (`models/`)

All models use Mongoose with `{ timestamps: true }` (so `createdAt` / `updatedAt` are automatic).

| Model | Key fields | Notes |
| --- | --- | --- |
| `admin` | `firstName`, `lastName`, `email`, `phone`, `role` (`super_admin` \| `admin`), `password`, `permissions: Map<module, action[]>`, `tempPassword`, `avatar` | Schema methods: `createJWT()`, `matchPassword()`, `matchTemporaryPassword()`. Phone validated via E.164 regex. |
| `client` | Same shared user fields plus `company`, `code`, `type` (`company` \| `personal`), `area` (`Plav` \| `Murino` \| `Ruralne oblasti`), `invoiceToEmail`, `tempPassword` | Same JWT/password helper methods. |
| `adminChange` | `adminId`, `module`, `action` | Audit log row (one document per privileged admin operation). |
| `news` | `cover`, `title`, `content`, `tagIds[]`, `images[]`, `createdBy {fullName, id}`, `views[{userId, viewedAt}]`, `status` (`active`/`draft`/`archive`) | Views are appended on each read; dashboard counts derive from this array. |
| `tags` | `name` (unique, 2–15 chars) | |
| `category` | `name`, `parentId`, `breadcrumb`, `children` | Self-referential tree with `Schema.Types.Mixed` for the recursive children. |
| `documents` | `name`, `description`, `file`, `categoryId`, `size`, `type` (`PDF`/`WORD`/`EXCEL`/`PPT`/`TXT`/`OTHER`) | File URL points to Uploadcare. |
| `invoiceDocument` | All `documents` fields plus `invoiceType`, `area`, `year`, `month`, `sent` | `sent` is flipped by `emailCron` once delivery succeeds. |

---

## 8. Validators (`validators/`)

Per-resource Zod schemas. Each exposes a factory `xxxInputSchema(isAllOptional = false)` so the same schema can validate both create (all required) and update (all optional) payloads via `.partial()`.

- **`helperValidators.ts`** — `passwordSchema` enforces ≥8 chars, requires upper+lower+digit+special, then `transform`s the value into a bcrypt hash (so parsed data is already storage-ready). `sharedUserFields` is reused by both admin and client schemas.
- **`adminValidators.ts`** — Adds `avatar`, `role` enum, and a `permissions` record keyed by module → action array.
- **`clientValidator.ts`** — Adds `invoiceToEmail`, `company`, `code`, `type`, `area`.
- **`categoryValidator.ts`** — Recursive `z.lazy(...)` schemas for breadcrumb/children trees. Provides full and partial variants.
- **`documents.ts`** — Validates document metadata + file URL + size + type enum.
- **`invoiceDocumentValidator.ts`** — Document fields plus `invoiceType`, `area`, `year`, `month`.

Validation pattern in controllers:

```ts
const parsed = await schema(false).safeParseAsync(req.body);
if (!parsed.success) {
  throw new BadRequest('Zod validation failed', parsed.error.flatten().fieldErrors);
}
// use parsed.data
```

---

## 9. Helpers (`helpers/`)

- **`helperFunctions.ts`**
  - `hasPermission(module, action, role, permissions)` — Super-admins always pass; admins must have `action` in `permissions[module]`.
  - `emailInUse(email)` — Cross-checks both `Admin` and `Client` collections.
  - `userType(id, byEmail?)` — Returns `"admin"` or `"client"`.
  - `userExists(id, byEmail?)` — Boolean existence check across both collections.
  - `newsExists`, `tagExists`, `categoryExists`, `documentExists`, `invoiceDocumentExists` — Per-resource existence checks.
  - `hashPassword(password)` — `bcrypt.genSalt(10)` + `bcrypt.hash`.
  - `getStartOfWeek()` — Returns the Monday of the current week (used by the dashboard).
- **`helperTypes.ts`** — Shared `PermissionAction`, `PermissionModule`, and `BasicUser` types reused by models and validators.
- **`index.d.ts`** — Augments `Express.Request` so `req.user?.userId` is typed everywhere.

---

## 10. Authentication & Authorization Flow

1. `POST /api/v1/login` — `LogIn` looks up the email in both collections, verifies the regular password (or, if `tempPassword.needsChange` is true and `validUntil > now`, the hashed temp password), and returns a JWT signed with `JWT_SECRET` (lifetime from `JWT_LIFETIME`). The response also includes `needsPasswordChange` so the client can prompt for a new password.
2. `POST /api/v1/forgotPassword` — `sendPasswordEmail` generates an 8-char UUID slice, hashes it, stores it in `tempPassword` with a 15-minute `validUntil`, and emails the plain-text temp password via Brevo.
3. The client sends subsequent requests with `Authorization: Bearer <jwt>`.
4. `checkAuth` verifies the JWT and sets `req.user`.
5. `checkAdmin` (on admin-only routers) blocks clients via `ForbiddenError`.
6. Within admin endpoints, fine-grained `hasPermission(module, action, role, permissionsMap)` checks are enforced. `super_admin` bypasses these checks; regular admins must have the matching `(module, action)` pair in their permission map.
7. Each privileged action calls `saveChange(...)` to append a row to `AdminAction` for audit history (read back via `GET /adminChanges`).

---

## 11. File Storage Handling

- Files live on **Uploadcare**. The DB stores the resulting URL (e.g. avatar URL, news image URL, document file URL).
- When a record that owns files is deleted (`Admin` avatar, `News` images, `Document.file`), the controller calls `fileDelete(uuid)` / `filesDelete(uuids)` so storage doesn't leak. The UUID is extracted from the URL path.
- Authentication uses `UploadcareSimpleAuthSchema` initialized from `UPLOADCARE_PUBLIC_KEY` / `UPLOADCARE_SECRET_KEY` env variables.

---

## 12. Email & Cron Handling

- **Brevo** is used for two flows:
  - Password reset (`sendPasswordEmail`) — sends the temp password.
  - Invoice delivery (`sendInvoice`) — sends the invoice file URL to a client.
- **`emailCron`** runs every minute. For the current `(year, month)` it picks the first invoice document with `sent: false`, mails it to every client with `invoiceToEmail: true`, then sets `sent = true` to prevent duplicate sending.

---

## 13. API Documentation

- `swagger.ts` configures `swagger-autogen` to scan `index.ts` (and the routers/controllers it imports).
- Controllers add inline annotations like `// #swagger.tags = ['News']` and `// #swagger.description = '...'`.
- Run `npm run swagger` → produces `swagger-output.json`.
- The server serves it at `http://localhost:3000/api-docs` via `swagger-ui-express`.

---

## 14. Environment Variables (expected `.env`)

| Variable | Used by |
| --- | --- |
| `MONGO_URI` | `connectDB` (Mongoose connection) |
| `JWT_SECRET`, `JWT_LIFETIME` | JWT signing & verification |
| `BREVO_KEY` | Brevo transactional email client |
| `UPLOADCARE_PUBLIC_KEY`, `UPLOADCARE_SECRET_KEY` | Uploadcare REST client |

---

## 15. Conventions & Patterns

- **One file per resource** across `routers/`, `controllers/`, `models/`, and (where applicable) `validators/`.
- **Throw, don't return** — controllers throw custom errors; middleware turns them into responses.
- **Two-phase password validation** — Zod `passwordSchema` both validates AND hashes via `transform`, so the parsed value is the bcrypt hash.
- **Same input schema for create & update** — factory functions return either the strict object or `.partial()` based on a flag.
- **Audit everything privileged** — admin reads, writes, deletes, and updates all call `saveChange` to append to `AdminAction`.
- **List endpoints share the same shape** — `search`, optional filters, `sort`, `order`, `limit`, `page`; response is `{ count, total, page, totalPages, <items> }`.
- **Public vs admin reads are separated** — `public.ts` exposes read-only endpoints with no auth; the admin equivalents live behind `checkAuth + checkAdmin`.
