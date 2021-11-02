from django.shortcuts import render

# Create your views here.
from .models import Tasks
from rest_framework import viewsets
from .serializers import TasksSerializer
from rest_framework.decorators import api_view

# Create your views here.


class TasksView(viewsets.ModelViewSet):
    serializer_class = TasksSerializer
    queryset = Tasks.objects.all()


@api_view(['GET', 'POST', 'DELETE'])
def home(request):
    return render(request, "index.html")


def delete(request, id):
    instance = Tasks.objects.filter(id=id)
    instance.delete()
    return render(request, 'index.html')


def add(request, msg):
    instance = Tasks(msg=msg)
    instance.save()
    return render(request, "index.html")
