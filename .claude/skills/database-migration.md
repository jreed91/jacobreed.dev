# Database Migration

Create and manage database schema changes for jacobreed.dev using Prisma.

## Instructions

When the database schema needs to be modified:

1. **Update the Prisma schema**:
   - Edit `prisma/schema.prisma`
   - Make necessary changes to models
   - Follow Prisma schema conventions

2. **Common schema changes**:

   **Add a new field to existing model:**
   ```prisma
   model projects {
     slug        String @id @db.VarChar(128)
     name        String @db.VarChar(256)
     description String @db.VarChar(512)
     image       String @db.VarChar(256)
     url         String? @db.VarChar(512)  // New optional field
     technologies String? @db.Text           // New field
   }
   ```

   **Add a new model:**
   ```prisma
   model tags {
     id          Int      @id @default(autoincrement())
     name        String   @unique @db.VarChar(50)
     slug        String   @unique @db.VarChar(50)
     description String?  @db.VarChar(256)
     createdAt   DateTime @default(now())
   }
   ```

   **Add a relation:**
   ```prisma
   model projects {
     slug        String @id @db.VarChar(128)
     name        String @db.VarChar(256)
     description String @db.VarChar(512)
     image       String @db.VarChar(256)
     tags        ProjectTag[]
   }

   model tags {
     id          Int          @id @default(autoincrement())
     name        String       @unique @db.VarChar(50)
     projects    ProjectTag[]
   }

   model ProjectTag {
     projectSlug String
     tagId       Int
     project     projects @relation(fields: [projectSlug], references: [slug])
     tag         tags     @relation(fields: [tagId], references: [id])

     @@id([projectSlug, tagId])
   }
   ```

3. **Generate Prisma Client**:
   ```bash
   npm run generate-prisma
   ```
   - Regenerates the Prisma Client with new schema
   - Updates TypeScript types
   - Required before using new schema in code

4. **Create migration (if deploying to production)**:
   ```bash
   npx prisma migrate dev --name descriptive_migration_name
   ```
   - Creates a new migration file
   - Applies changes to database
   - Updates `prisma/migrations/` directory
   - Use descriptive names: `add_url_to_projects`, `create_tags_table`, etc.

5. **Verify the migration**:
   - Check that migration file is created
   - Review SQL in migration file
   - Test database queries with new schema
   - Ensure TypeScript types are updated

6. **Update application code**:
   - Update database queries to use new fields
   - Update TypeScript interfaces if needed
   - Update API routes that interact with changed models
   - Update components that display the data

7. **Test the changes**:
   - Run tests: `npm test`
   - Test API endpoints manually or with curl
   - Verify UI displays new data correctly
   - Check both development and build modes

## Development Workflow

```bash
# 1. Edit schema
vim prisma/schema.prisma

# 2. Generate Prisma Client
npm run generate-prisma

# 3. Create and apply migration
npx prisma migrate dev --name add_technologies_field

# 4. Verify changes
npx prisma studio  # Open GUI to inspect database

# 5. Update code
# ... make necessary code changes ...

# 6. Test
npm test
```

## Common Migration Scenarios

### Adding an Optional Field
```prisma
model projects {
  // ... existing fields ...
  githubUrl String? @db.VarChar(256)  // Optional field
}
```
Migration: Safe, no data changes needed

### Adding a Required Field
```prisma
model projects {
  // ... existing fields ...
  priority Int @default(0)  // Required with default
}
```
Migration: Use `@default()` for existing rows

### Renaming a Field
```bash
# Use Prisma's rename feature
npx prisma migrate dev
# Prisma will detect and prompt for rename confirmation
```

### Deleting a Field
Remove from schema, then migrate:
```bash
npx prisma migrate dev --name remove_old_field
```
⚠️ Warning: This deletes data permanently

## Database Backup

Before major migrations:

```bash
# Create backup
mysqldump -u user -p database_name > backups/backup_$(date +%Y%m%d_%H%M%S).sql

# Or use Prisma Studio to export data
npx prisma studio
```

## Prisma Studio

Inspect and edit database with GUI:

```bash
npx prisma studio
```
- Opens web interface at http://localhost:5555
- View all tables and records
- Manually add/edit/delete records
- Useful for debugging and data inspection

## Production Deployment

When deploying migrations to production:

1. **Test thoroughly in development first**
2. **Create database backup**
3. **Apply migration**:
   ```bash
   npx prisma migrate deploy
   ```
4. **Verify application works**
5. **Monitor for errors**

## Troubleshooting

**"Migration failed"**
- Check database connection (DATABASE_URL)
- Verify database user has sufficient permissions
- Review SQL in migration file for syntax errors
- Check for constraint violations

**"Schema drift detected"**
- Database doesn't match schema
- Run `npx prisma migrate dev` to sync
- Or run `npx prisma db push` for quick sync (dev only)

**"Type errors after migration"**
- Regenerate Prisma Client: `npm run generate-prisma`
- Restart TypeScript server in your editor
- Clear node_modules/.cache if needed

**"Can't connect to database"**
- Verify DATABASE_URL in .env file
- Ensure database server is running
- Check network connectivity
- Verify credentials are correct

## Best Practices

- **Always backup before major migrations**
- **Test migrations in development first**
- **Use descriptive migration names**
- **Add defaults for required fields on existing tables**
- **Document breaking changes**
- **Keep migrations atomic (one logical change)**
- **Review generated SQL before applying**
- **Version control migration files**
- **Never edit applied migration files**
- **Use `migrate dev` in development**
- **Use `migrate deploy` in production**

## Resources

- Prisma Schema Reference: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- Prisma Migrate: https://www.prisma.io/docs/concepts/components/prisma-migrate
- Database in this project: MySQL
