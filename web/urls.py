from django.conf.urls import patterns, url
from django.views.generic import DetailView, ListView

from web import views
from web.models import Post

urlpatterns = patterns('',

                       url(r'^$', views.index, name='index'),
                       url(r'^page/(?P<page>\d+)/$', views.index,name='indexPage'),
                       url(r'^post/(?P<postID>\d+)/$', views.detailView, name='detailView'),
                       url(r'^post/(?P<postID>\d+)/page/(?P<page>\d+)/$', views.detailView, name='detailViewPage'),
                       url(r'^category/(?P<categoryName>\w+)/$', views.categoryView, name='categoryView'),
                       url(r'^category/(?P<categoryName>\w+)/page/(?P<page>\d+)/$', views.categoryView, name='categoryViewPage'),
                       url(r'^tag/(?P<tagName>.+)/$', views.tagView, name='tagView'),
                       url(r'^tag/(?P<tagName>.+)/page/(?P<page>\d+)/$', views.tagView, name='tagViewPage'),
                       url(r'^time/(?P<year>\d{4})/(?P<month>\d{2})/$', views.tagView, name='timeView'),
                       url(r'^time/(?P<year>\d{4})/(?P<month>\d{2})/page/(?P<page>\d+)/$', views.tagView, name='timeViewPage'),
                       url(r'^author/(?P<authorName>\w+)/$', views.authorView, name='authorView'),
                       url(r'^author/(?P<authorName>\w+)/page/(?P<page>\d+)/$', views.authorView, name='authorViewPage'),
                       url(r'^category/(?P<categoryName>\w+)/$', views.categoryView, name='categoryView'),
                       url(r'^category/(?P<categoryName>\w+)/page/(?P<page>\d+)/$', views.categoryView, name='categoryViewPage'),

)

"""
                       url(r'^$', ListView.as_view(
                           queryset=Post.objects.order_by('-createTime')[:5],
                           context_object_name='postList',
                           template_name='web/index.html'), name='index'),
                       url(r'^(?P<pk>\d+)/$', DetailView.as_view(
                           model=Post,
                           template_name='web/detail.html'),
                           name='detailPost'), """