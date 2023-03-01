from rest_framework import serializers
from Django_App.models.Enrollment import Enrollment

class EnrollmentSerializer(serializers.ModelSerializer):      

    class Meta:        
        model = Enrollment
        fields = '__all__'