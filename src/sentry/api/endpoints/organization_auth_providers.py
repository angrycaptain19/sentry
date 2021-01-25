from __future__ import absolute_import

from rest_framework.response import Response

from sentry.auth import manager
from sentry.api.bases.organization import OrganizationEndpoint, OrganizationAuthProviderPermission
from sentry.api.serializers import serialize


class OrganizationAuthProvidersEndpoint(OrganizationEndpoint):
    permission_classes = (OrganizationAuthProviderPermission,)

    def get(self, request, organization):
        """
        List available auth providers that are available to use for an Organization
        ```````````````````````````````````````````````````````````````````````````

        :pparam string organization_slug: the organization short name
        :auth: required
        """
        provider_list = [
            {"key": k, "name": v.name, "requiredFeature": v.required_feature}
            for k, v in manager
        ]

        return Response(serialize(provider_list, request.user))
