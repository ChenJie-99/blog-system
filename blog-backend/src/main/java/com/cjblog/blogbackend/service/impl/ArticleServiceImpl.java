package com.cjblog.blogbackend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cjblog.blogbackend.entity.Article;
import com.cjblog.blogbackend.mapper.ArticleMapper;
import com.cjblog.blogbackend.service.ArticleService;
import org.springframework.stereotype.Service;

@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {
}