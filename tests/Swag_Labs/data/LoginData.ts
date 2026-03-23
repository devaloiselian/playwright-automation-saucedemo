/*
 * Test Data Management (TDM) for Login Flow.
 * Extracts environment variables for standard access and defines
 * Data-Driven Testing (DDT) structures for negative and edge case scenarios.
 */

// Default credentials for Happy Path and Test Setup phases.
// Added a fallback string just in case the CI/CD pipeline misses the .env file.
export const validCredentials = {
  username: process.env.TEST_USERNAME as string || 'standard_user',
  password: process.env.TEST_PASSWORD as string || 'secret_sauce'
};

/*
 * Data provider for negative authentication scenarios.
 * Using an array of objects allows us to run dynamic, parameterized tests
 * reducing code duplication in the spec files.
 */
export const loginErrorScenarios = [
  {
    description: 'empty fields',
    user: '',
    password: '',
    expectedError: 'Epic sadface: Username is required'
  },
  {
    description: 'only username',
    user: validCredentials.username,
    password: '',
    expectedError: 'Epic sadface: Password is required'
  },
  {
    description: 'only password',
    user: '',
    password: validCredentials.password,
    expectedError: 'Epic sadface: Username is required'
  },
  {
    description: 'invalid credentials',
    user: 'invalid_user',
    password: 'wrong_password',
    expectedError: 'Epic sadface: Username and password do not match any user in this service'
  },
  {
    description: 'locked out user',
    user: 'locked_out_user',
    password: validCredentials.password,
    expectedError: 'Epic sadface: Sorry, this user has been locked out.'
  }
];

// Reference list of accepted users to validate UI helper banners
export const expectedUsersList = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];