require("dotenv").config({ path: ".env.production" });
const { execSync } = require("child_process");

try {
  // Run Prisma migration using execSync
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
} catch (error) {
  console.error(error);
  process.exit(1);
}
