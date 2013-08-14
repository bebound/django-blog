from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from tinymce.models import HTMLField
import datetime


class Category(models.Model):
    category = models.CharField(max_length=100)
    alias = models.CharField(max_length=100)
    sort = models.IntegerField()

    def __unicode__(self):
        return self.category


class Tag(models.Model):
    tag = models.CharField(max_length=50)
    postID = models.TextField(editable=False)

    def __unicode__(self):
        return self.tag


class Post(models.Model):
    contentStatusPublished = 1
    contentStatusDraft = 2
    contentStatusChoice = (
        (contentStatusPublished, 'Published'),
        (contentStatusDraft, 'Draft'),
    )

    title = models.CharField(max_length=150)
    alias = models.CharField(max_length=300, blank=True)
    keyword = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    body = HTMLField()
    excerpt = models.TextField(blank=True)

    status = models.IntegerField(choices=contentStatusChoice, default=contentStatusPublished)
    author = models.ForeignKey(User)
    category = models.ForeignKey(Category)
    tag = models.ManyToManyField(Tag, blank=True)

    viewCount = models.IntegerField(default=0)
    commentCount = models.IntegerField(default=0)
    dayCount = models.IntegerField(default=0)
    weekCount = models.IntegerField(default=0)
    monthCount = models.IntegerField(default=0)

    lastCountModified = models.DateTimeField(editable=False, auto_now_add=True)
    createTime = models.DateTimeField(editable=False, auto_now_add=True)
    lastModified = models.DateTimeField(editable=False, auto_now=True)
    #lastCountModified = models.DateTimeField()
    #createTime = models.DateTimeField()
    #lastModified = models.DateTimeField()

    """
    def save(self, *args, **kwargs):
        if not self.id:
            self.lastCountModified=datetime.datetime.now()
        self.lastCountModified=datetime.datetime.now()
        super(Post, self).save(*args, **kwargs)
    """


    def __unicode__(self):
        return self.title