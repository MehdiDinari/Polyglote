from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField(read_only=True)
    remaining_slots = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'teacher', 'start_date', 'end_date', 'price', 'available_slots', 'reserved_slots', 'remaining_slots']

    def get_remaining_slots(self, obj):
        return obj.available_slots - obj.reserved_slots
