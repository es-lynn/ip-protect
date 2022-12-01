/*
  Warnings:

  - A unique constraint covering the columns `[projectId,userId]` on the table `ProjectUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectUser_projectId_userId_key" ON "ProjectUser"("projectId", "userId");
