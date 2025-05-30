from django.urls import path
from .views import DocumentUploadView
from .views import AskQuestionView
from .views import DocumentListView
from .views import DocumentDeleteView


urlpatterns = [
    path('upload/', DocumentUploadView.as_view(), name='upload-document'),
    path('ask/', AskQuestionView.as_view(), name='ask-question'),
    path('documents/', DocumentListView.as_view(), name='list-documents'),
    path('documents/<int:pk>/', DocumentDeleteView.as_view(), name='delete-document'),
]
