from __future__ import absolute_import

import six

from sentry.api.serializers import Serializer, register, serialize
from sentry.models import GroupSeen


@register(GroupSeen)
class GroupSeenSerializer(Serializer):
    def get_attrs(self, item_list, user):
        user_map = {d["id"]: d for d in serialize({i.user for i in item_list}, user)}

        return {
            item: {"user": user_map[six.text_type(item.user_id)]}
            for item in item_list
        }

    def serialize(self, obj, attrs, user):
        data = attrs["user"]
        data["lastSeen"] = obj.last_seen
        return data
