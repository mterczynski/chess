#!/bin/bash
set -e

GITHUB_REPO="mterczynski/chess"
ROLE_NAME="GitHubActionsDeployRole"

# Get or create OIDC provider
OIDC_ARN=$(aws iam list-open-id-connect-providers --query "OpenIDConnectProviderList[?contains(Arn, 'token.actions.githubusercontent.com')].Arn" --output text)
[ -z "$OIDC_ARN" ] && OIDC_ARN=$(aws iam create-open-id-connect-provider \
    --url "https://token.actions.githubusercontent.com" \
    --client-id-list "sts.amazonaws.com" \
    --thumbprint-list "6938fd4d98bab03faadb97b34396831e3780aea1" \
    --query 'OpenIDConnectProviderArn' --output text)

# Create trust policy
cat > /tmp/trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Federated": "${OIDC_ARN}"},
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {"token.actions.githubusercontent.com:aud": "sts.amazonaws.com"},
      "StringLike": {"token.actions.githubusercontent.com:sub": "repo:${GITHUB_REPO}:ref:refs/heads/main"}
    }
  }]
}
EOF

# Create or update role
aws iam get-role --role-name "${ROLE_NAME}" &>/dev/null && \
    aws iam update-assume-role-policy --role-name "${ROLE_NAME}" --policy-document file:///tmp/trust-policy.json || \
    aws iam create-role --role-name "${ROLE_NAME}" --assume-role-policy-document file:///tmp/trust-policy.json

# Attach policies
aws iam attach-role-policy --role-name "${ROLE_NAME}" --policy-arn "arn:aws:iam::aws:policy/AdministratorAccess-AWSElasticBeanstalk" 2>/dev/null || true
aws iam attach-role-policy --role-name "${ROLE_NAME}" --policy-arn "arn:aws:iam::aws:policy/AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy" 2>/dev/null || true

# Output
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"

echo ""
echo "Add to GitHub secrets:"
echo "  Name:  AWS_ROLE_ARN"
echo "  Value: ${ROLE_ARN}"
echo ""
echo "gh secret set AWS_ROLE_ARN --body \"${ROLE_ARN}\" --repo ${GITHUB_REPO}"
