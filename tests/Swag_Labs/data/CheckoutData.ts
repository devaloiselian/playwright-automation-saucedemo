import { CheckoutData } from '../pages/CheckoutInfoPage';

// Local interface for structuring a test array
export interface CheckoutErrorScenario {
  description: string;
  data: CheckoutData;
  expectedError: string;
}

// Export the array for any test can use it
export const checkoutErrorScenarios: CheckoutErrorScenario[] = [
  {
    description: 'all fields are empty',
    data: { firstName: '', lastName: '', postalCode: '' },
    expectedError: 'Error: First Name is required'
  },
  {
    description: 'First Name is missing',
    data: { firstName: '', lastName: 'Man', postalCode: '12345' },
    expectedError: 'Error: First Name is required'
  },
  {
    description: 'Last Name is missing',
    data: { firstName: 'Carlos', lastName: '', postalCode: '12345' },
    expectedError: 'Error: Last Name is required'
  },
  {
    description: 'Postal Code is missing',
    data: { firstName: 'Tomy', lastName: 'Spell', postalCode: '' },
    expectedError: 'Error: Postal Code is required'
  }
];

// Data for Happy Path
export const validCheckoutData: CheckoutData = {
  firstName: 'Tomy',
  lastName: 'Rab',
  postalCode: '12345'
};