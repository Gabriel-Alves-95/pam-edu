from Django_App.models import *

class Enrollment(models.Model):   

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    p1 = models.IntegerField(null=True, blank=True)
    p2 = models.IntegerField(null=True, blank=True)
    p3 = models.IntegerField(null=True, blank=True)
    p4 = models.IntegerField(null=True, blank=True)
    pf = models.IntegerField(null=True, blank=True)
    frequency = models.FloatField(null=True, blank=True)
    final_status = models.CharField(max_length=35, null=True, blank=True)

    def __str__(self):
        return self.course.name

    class Meta:
        unique_together = [['student', 'course']]