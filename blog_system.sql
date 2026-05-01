create database blog_system default character set utf8mb4;

use blog_system;

create table article (
    id bigint primary key auto_increment comment '文章ID',
    title varchar(100) not null comment '文章标题',
    summary varchar(255) comment '文章摘要',
    content text not null comment '文章内容',
    cover varchar(255) comment '封面图',
    view_count int default 0 comment '浏览量',
    status tinyint default 1 comment '状态：1正常 0禁用',
    create_time datetime default current_timestamp comment '创建时间',
    update_time datetime default current_timestamp on update current_timestamp comment '更新时间'
);