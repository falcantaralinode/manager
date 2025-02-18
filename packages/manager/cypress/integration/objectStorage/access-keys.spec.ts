import { createBucket } from 'support/api/objectStorage';
import {
  containsVisible,
  fbtClick,
  fbtVisible,
  getClick,
  getVisible,
} from 'support/helpers';
import { randomLabel } from 'support/util/random';

describe('access keys', () => {
  it('create access key', () => {
    const bucketLabel = randomLabel();
    const accessKeyLabel = 'cy-test-key';
    const clusterId = 'us-east-1';
    // catch create access key request
    cy.intercept('POST', `*/object-storage/keys`).as('createAccessKey');
    createBucket(bucketLabel, clusterId).then(() => {
      cy.visitWithLogin('/object-storage/access-keys');
      getVisible('[data-qa-header]').within(() => {
        fbtVisible('Object Storage');
      });
      fbtClick('Create Access Key');
      containsVisible('Create Access Key');
      getVisible('[data-testid="textfield-input"]').type(accessKeyLabel);
      getClick('[data-qa-toggle="false"]');
      getVisible('[data-qa-toggle="true"]');
      getClick('[aria-label="Select read/write for all"]');
      getClick('[data-qa-submit="true"]');
      cy.wait('@createAccessKey');
      fbtVisible(
        "For security purposes, we can only display your secret key once, after which it can't be recovered. Be sure to keep it in a safe place."
      );
      getClick('[data-qa-close-drawer="true"]');
      fbtVisible(accessKeyLabel);
    });
  });
});
