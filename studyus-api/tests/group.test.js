const db = require("../db");
const Groups = require("../models/groups");
const { BadRequestError } = require("../utils/errors");
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach} = require("./common")

beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)


describe("Test Group Model", () => {
  // TEST THAT A GROUP CAN BE CREATED
  describe("Test Create Group", () => {
    // Test that a group can be created
    test("Can create a new group", async () => {
      const group = await Groups.createGroup({
        name: "Test Group",
        description: "This is a test group"
      });

      expect(group.id).toBeDefined();
      expect(group.name).toBe("Test Group");
      expect(group.description).toBe("This is a test group");
    });
  });

  // TEST THAT A USER CAN BE ADDED TO A GROUP
  describe("Test Add User to Group", () => {
    // Test that a user can be added to a group
    test("Can add user to group successfully", async () => {
      // Get the first group ID
      const groupId = await db.query("SELECT id FROM groups");

      // Get the first user ID
      const userId = await db.query("SELECT id FROM users");

      // Add the user to the group
      await Groups.addNewGroupMember(userId.rows[0].id, groupId.rows[0].id);

      // Check if the user is in the group
      const userGroup = await db.query(
        "SELECT * FROM group_members WHERE member_id=$1 AND group_id=$2",
        [userId.rows[0].id, groupId.rows[0].id]
      );

      // Assure that the user group has been added successfully
      expect(userGroup.rows.length).toBe(1);
    });

    // Test that a user cannot be added to the same group twice
    test("Cannot add user to the same group twice", async () => {
      // Get the first group ID
      const groupId = await db.query("SELECT id FROM groups");

      // Get the first user ID
      const userId = await db.query("SELECT id FROM users");

      // Add the user to the group
      await Groups.addNewGroupMember(userId.rows[0].id, groupId.rows[0].id);

      // Attempt to add the user to the same group again and check if a BadRequestError is thrown
      try {
        await Groups.addNewGroupMember(userId.rows[0].id, groupId.rows[0].id);
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
        expect(err.message).toEqual("User is already in the group");
      }
    });
  });

  // TEST THAT A USER CAN BE REMOVED FROM A GROUP
  describe("Test Remove User from Group", () => {
    // Test that a user can be removed from a group
    test("Can remove user from group successfully", async () => {
        // Get the first group ID
        const groupId = await db.query("SELECT id FROM groups");

        // Get the first user ID
        const userId = await db.query("SELECT id FROM users");

        // Add the user to the group
        await Groups.addNewGroupMember(userId.rows[0].id, groupId.rows[0].id);

        // Check if the user is in the group
        let userGroup = await db.query(
            "SELECT * FROM group_members WHERE member_id=$1 AND group_id=$2",
            [userId.rows[0].id, groupId.rows[0].id]
        );

        // Assure that the user group has been added successfully
        expect(userGroup.rows.length).toBe(1);

            // Remove the user from the group
            await Groups.leaveGroup(userId.rows[0].id, groupId.rows[0].id);

            // Check if the user is no longer in the group
            userGroup = await db.query(
                "SELECT * FROM group_members WHERE member_id=$1 AND group_id=$2",
                [userId.rows[0].id, groupId.rows[0].id]
            );

            // Assure that the user group has been removed successfully
            expect(userGroup.rows.length).toBe(0);
            });

            // Test that a user cannot be removed from a group they are not a part of
            test("Cannot remove user from a group they are not in", async () => {
            // Get the first group ID
            const groupId = await db.query("SELECT id FROM groups");

            // Get the first user ID
            const userId = await db.query("SELECT id FROM users");

            // Attempt to remove the user from the group and check if a BadRequestError is thrown
            try {
                await Groups.leaveGroup(userId.rows[0].id, groupId.rows[0].id);
            } catch (err) {
                expect(err instanceof BadRequestError).toBeTruthy();
                expect(err.message).toEqual("User is not in the group");
            }
        });
    });
});
