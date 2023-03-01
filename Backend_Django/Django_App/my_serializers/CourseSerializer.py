from rest_framework import serializers
from Django_App.models.Course import Course

class CourseSerializer(serializers.ModelSerializer):
  
    class Meta:        
        model = Course
        fields = '__all__'

    def to_representation(self, instance):
        representation= dict()

        representation["id"] = instance.id
        representation["name"] = instance.name
        representation["year"] = instance.year
        representation["cycle"] = instance.cycle
        representation["level"] = instance.level
        representation["teacher"] = {
            "id": instance.teacher.id,
            "teacher_profile": {
                "id": instance.teacher.teacher.id,
                "user": {
                    "id": instance.teacher.teacher.user.id,
                    "username": instance.teacher.teacher.user.username,
                    "full_name": instance.teacher.teacher.user.get_full_name(),
                    "email": instance.teacher.teacher.user.email                        
                },
                "birthday": instance.teacher.teacher.birthday if instance.teacher.teacher.birthday else None,
                "phone_number": instance.teacher.teacher.phone_number if instance.teacher.teacher.phone_number else None,
                "address": instance.teacher.teacher.address if instance.teacher.teacher.address else None,
                "photo": instance.teacher.teacher.photo if instance.teacher.teacher.photo else None,
                "created_at": instance.teacher.teacher.created_at,
                "updated_at": instance.teacher.teacher.updated_at            
            }            
        }        

        return representation