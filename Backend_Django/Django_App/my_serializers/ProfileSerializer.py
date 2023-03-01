from rest_framework import serializers
from Django_App.models.Profile import Profile
from .UserSerializer import UserSerializer

class ProfileSerializer(serializers.ModelSerializer):
   
    user = UserSerializer()

    class Meta:        
        model = Profile                
        fields = '__all__'        