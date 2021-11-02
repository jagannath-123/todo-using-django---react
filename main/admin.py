from django.contrib import admin

# Register your models here.
from .models import Tasks

class TasksAdmin(admin.ModelAdmin):
    list_display = ('msg', 'date')

admin.site.register(Tasks)