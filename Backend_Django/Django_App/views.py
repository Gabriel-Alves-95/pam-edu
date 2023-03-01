# from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import authentication_classes, permission_classes

from django.contrib.auth.models import User
from .models.Profile import Profile
from .models.Teacher import Teacher
from .models.AdultInCharge import AdultInCharge
from .models.Student import Student

from Django_App.my_serializers.UserSerializer import UserSerializer
from Django_App.my_serializers.ProfileSerializer import ProfileSerializer
from Django_App.my_serializers.TeacherSerializer import TeacherSerializer
from Django_App.my_serializers.AdultInChargeSerializer import AdultInChargeSerializer
from Django_App.my_serializers.StudentSerializer import StudentSerializer
    
@api_view(['GET'])
def users_list(request):
    pk = int(request.GET['pk'])
    if pk:
        data = User.objects.filter(id=pk)
    else:
        data = User.objects.all()

    serializer = UserSerializer(data, context={'request': request}, many=True)   

    return Response(serializer.data) 

@api_view(['DELETE'])
def users_delete(request):
    user_id = int(request.GET['user_id'])
    User.objects.filter(id=user_id).delete()  

    return Response(status=status.HTTP_301_MOVED_PERMANENTLY) 

@api_view(['GET'])
def profiles_list(request):
    data = Profile.objects.all()
    serializer = ProfileSerializer(data, context={'request': request}, many=True)   

    return Response(serializer.data)  
 
@api_view(['GET'])
def teachers_list(request):
    data = Teacher.objects.all()
    serializer = TeacherSerializer(data, context={'request': request}, many=True)   

    return Response(serializer.data)


@api_view(['GET'])
def adults_list(request):
    data = AdultInCharge.objects.all()
    serializer = AdultInChargeSerializer(data, context={'request': request}, many=True)   

    return Response(serializer.data) 

@api_view(['GET'])
def students_list(request):
    data = Student.objects.all()
    serializer = StudentSerializer(data, context={'request': request}, many=True)   

    return Response(serializer.data)

@api_view(['POST'])
def users_create(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def profiles_update(request):      
    user_id = int(request.GET['user_id'])
    profile = Profile.objects.filter(id=user_id)
    serializer = ProfileSerializer(data=profile)       

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)        
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)