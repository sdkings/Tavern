# Generated by Django 5.1.2 on 2024-11-23 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('node', '0005_alter_node_remote_node_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='remote_node_url',
            field=models.URLField(default='http://example.com/node/9dffc96c-5a2b-4717-a88a-14eaa5c743da', primary_key=True, serialize=False),
        ),
    ]
