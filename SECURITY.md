# Security Guidelines

## ⚠️ CRITICAL: Environment Variables

**NEVER commit `.env` files to version control!**

### Setup Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual credentials in `.env`

3. Verify `.env` is in `.gitignore`:
   ```bash
   git check-ignore .env
   # Should output: .env
   ```

### If you accidentally committed `.env`:

1. **Immediately rotate all credentials** in the file
2. Remove the file from git history:
   ```bash
   git rm --cached .env
   git commit -m "Remove .env from version control"
   ```
3. Add to `.gitignore` if not already there
4. Consider using tools like `git-secrets` or `gitleaks` to prevent future accidents

## Database Security

- Use strong, unique passwords for database connections
- Enable SSL/TLS for database connections in production
- Regularly rotate database credentials
- Use environment-specific databases (dev, staging, prod)

## API Security

Current security measures:
- ✅ Input validation with Zod schemas
- ✅ Error handling without leaking sensitive info
- ✅ Type-safe database queries with Prisma
- ⚠️ **TODO**: Add rate limiting to prevent abuse
- ⚠️ **TODO**: Add API authentication for sensitive endpoints

## Recommended Additional Security

1. **Rate Limiting**: Install and configure rate limiting
   ```bash
   npm install @upstash/ratelimit @upstash/redis
   ```

2. **CORS**: Review CORS settings in production
3. **CSP**: Add Content Security Policy headers
4. **Dependency Scanning**: Run `npm audit` regularly
