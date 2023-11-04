require("dotenv").config({ path: ".env.development" });
const { execSync } = require("child_process");

try {
  // Run Prisma migration using execSync
  execSync("npx prisma migrate dev", { stdio: "inherit" });
} catch (error) {
  console.error(error);
  process.exit(1);
}
