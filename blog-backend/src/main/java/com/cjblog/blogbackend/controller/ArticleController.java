package com.cjblog.blogbackend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cjblog.blogbackend.common.Result;
import com.cjblog.blogbackend.entity.Article;
import com.cjblog.blogbackend.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    
    private final ArticleService articleService;

   

    @PostMapping
    public Result<Article> add(@RequestBody Article article) {
        boolean ok = articleService.save(article);
        return ok ? Result.success(article) : Result.error("新增文章失败");
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        boolean ok = articleService.removeById(id);
        return ok ? Result.success() : Result.error("删除文章失败");
    }

    @PutMapping
    public Result<Article> update(@RequestBody Article article) {
        if (article.getId() == null) {
            return Result.error(400, "id 不能为空");
        }
        boolean ok = articleService.updateById(article);
        return ok ? Result.success(article) : Result.error("修改文章失败");
    }

    @GetMapping("/{id}")
    public Result<Article> getById(@PathVariable Long id) {
        Article article = articleService.getById(id);
        return article != null ? Result.success(article) : Result.error(404, "文章不存在");
    }

    @GetMapping("/page")
    public Result<Page<Article>> page(
            @RequestParam(defaultValue = "1") long current,
            @RequestParam(defaultValue = "10") long size,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Integer status
    ) {
        LambdaQueryWrapper<Article> qw = new LambdaQueryWrapper<>();
        qw.like(title != null && !title.isBlank(), Article::getTitle, title)
          .eq(status != null, Article::getStatus, status)
          .orderByDesc(Article::getCreateTime);

        Page<Article> page = articleService.page(new Page<>(current, size), qw);
        return Result.success(page);
    }
}