from Django_App.models import *

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)     
    birthday = models.DateField(default=None, null=True, blank=True)
    phone_number = models.CharField(default=None, null=True, blank=True, max_length=15)
    address = models.CharField(default=None, null=True, blank=True, max_length=255)
    photo = models.ImageField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.get_full_name()
    
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        try:
            if created:
                Profile.objects.create(user=instance)
        except:
            pass

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        try:
            instance.profile.save()
        except:
            pass

    

