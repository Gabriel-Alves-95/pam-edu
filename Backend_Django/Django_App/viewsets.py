from rest_framework import viewsets

from django.contrib.auth. models import User
from .models.Profile import Profile
from .models.Teacher import Teacher
from .models.AdultInCharge import AdultInCharge
from .models.Student import Student
from .models.Course import Course
from .models.Enrollment import Enrollment

from .my_serializers.UserSerializer import UserSerializer
from .my_serializers.ProfileSerializer import ProfileSerializer
from .my_serializers.TeacherSerializer import TeacherSerializer
from .my_serializers.AdultInChargeSerializer import AdultInChargeSerializer
from .my_serializers.StudentSerializer import StudentSerializer
from .my_serializers.CourseSerializer import CourseSerializer
from .my_serializers.EnrollmentSerializer import EnrollmentSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer    

class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer    

class TeacherViewset(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class AdultInChargeViewset(viewsets.ModelViewSet):
    queryset = AdultInCharge.objects.all()
    serializer_class = AdultInChargeSerializer  

class StudentViewset(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer  

class CourseViewset(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class EnrollmentViewset(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer