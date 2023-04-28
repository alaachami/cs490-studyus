# Test Suite for StudyUs Application

This folder contains the automated tests for the StudyUs application, as well as a folder called Insomnia that includes screenshots of manual tests conducted using the Insomnia REST client. 

## Automated Tests

The automated tests are written using [Jest](https://jestjs.io/docs/getting-started), and can be run using the following example command:

```
jest studyus-api/test/auth.test.js
```

The test suite includes tests for the user and group classes

## Manual Tests

The manual tests were conducted using the Insomnia REST client, and are included in the Insomnia folder. The screenshots in this folder depict the following tests:

- User login
- User registration
- Create group
- Get group list
- Remove user from group
- Send chat messages
- Start a call in group

To run these tests, open the Insomnia REST client and import the provided .json files. The screenshots in the Insomnia folder can be used as a reference to ensure that the tests are conducted correctly.

## Conclusion

With these automated and manual tests in place, we can ensure that the StudyUs application is functioning as expected and that new changes do not introduce regressions.
