# Database Schema Note

## ⚠️ Important: Schema Changes Reverted

### What Happened

During the improvement process, we initially planned to update the Prisma schema to add:
- A new `id` field as primary key (CUID)
- `createdAt` and `updatedAt` timestamps
- Unique constraint on `(seed, mode)`

However, when attempting to apply these changes, we discovered:

**🔴 The production database already contains 11,733 rows of data!**

### Why Changes Were Reverted

The planned schema changes were **breaking changes** that cannot be safely applied to a database with existing data:

1. **Adding required `id` column** - Prisma cannot add a required column with a prisma-level default (cuid()) to a table with existing rows
2. **Adding required `updatedAt` column** - Cannot add a required column without a default value to existing data

### Current Schema (Production-Compatible)

```prisma
model Seed {
  seed   String @id
  mode   String
  levels Json

  @@index([seed, mode])
}
```

### Current Limitations

1. **No composite keys** - Each `seed` is unique, cannot have multiple modes per seed
2. **No timestamps** - Cannot track when records were created/updated
3. **No explicit unique constraint** - Relying on `seed` being the primary key

### Future Migration Strategy

If you need to add these features in the future, here's the safe approach:

#### Option 1: Manual SQL Migration (Recommended for Production)

```sql
-- Step 1: Add optional id column
ALTER TABLE "Seed" ADD COLUMN "id" TEXT;

-- Step 2: Populate id for existing rows
UPDATE "Seed" SET "id" = gen_random_uuid()::TEXT WHERE "id" IS NULL;

-- Step 3: Make id required
ALTER TABLE "Seed" ALTER COLUMN "id" SET NOT NULL;

-- Step 4: Add timestamps with defaults
ALTER TABLE "Seed" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();
ALTER TABLE "Seed" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- Step 5: Change primary key
ALTER TABLE "Seed" DROP CONSTRAINT "Seed_pkey";
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_pkey" PRIMARY KEY ("id");

-- Step 6: Add unique constraint
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_seed_mode_key" UNIQUE ("seed", "mode");

-- Step 7: Add index
CREATE INDEX "Seed_seed_idx" ON "Seed"("seed");
```

#### Option 2: Backup and Restore

1. Export all data: `pg_dump > backup.sql`
2. Apply schema changes with `--force-reset`
3. Import data back
4. Update `id` values for all rows

#### Option 3: Create New Table (Zero Downtime)

1. Create new table `SeedV2` with new schema
2. Migrate data gradually
3. Update application to use new table
4. Drop old table when migration complete

### Why This Matters

**Data Safety First** - We prioritized keeping your 11,733 existing records safe over applying new schema improvements.

The current schema works perfectly fine and supports all application features. The planned improvements were **nice to have**, not **critical**.

### Impact on Application

✅ **No impact!** The application works perfectly with the current schema:
- All CRUD operations work
- Validation still in place (Zod)
- Error handling functional
- Performance optimizations active

### Recommendations

1. **Don't run `npx prisma db push --force-reset`** - This will delete all 11,733 records!
2. **If you need schema changes** - Plan a proper migration strategy first
3. **Test migrations on a copy** - Never test on production data
4. **Backup regularly** - Always have recent backups before schema changes

### Summary

| Feature | Planned | Current Status |
|---------|---------|----------------|
| Validation | ✅ Added | ✅ Working |
| Error handling | ✅ Added | ✅ Working |
| Caching | ✅ Added | ✅ Working |
| Type safety | ✅ Added | ✅ Working |
| Loading states | ✅ Added | ✅ Working |
| Fisher-Yates shuffle | ✅ Added | ✅ Working |
| Unique constraint | ❌ Reverted | ⚠️ Not added (has data) |
| Timestamps | ❌ Reverted | ⚠️ Not added (has data) |
| New PK structure | ❌ Reverted | ⚠️ Not added (has data) |

---

**Date**: October 28, 2025
**Records in DB**: 11,733
**Status**: Schema synchronized with production database
**Risk Level**: 🟢 Safe (no data loss)
