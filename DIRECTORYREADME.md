# 项目结构引导

## 目录结构说明
一、题型总共分为5类、即注意类（Attention）、逻辑类（Logic）、记忆类（Memory）、人格倾向（Personality）、场景类（Scene）, 每个类型下题型的对应的序号为该题的目录文件夹。
二、登录（Login）、注册（Register）、设备检测（Equipment）
三、引导页（Guide）

## 接口
接口映射：src/api/index.js
接口封装：src/api/http-methods.js

## 题目介绍页
拆分为：主体框架（views/题型/comprise/introduced-card）、头部（components/progress-header）、右侧内容区（components/question-introduce/..）

## 题目学习阶段
题型特有，在题型comprise文件夹下

## 题目练习阶段/正式阶段
通过questionStatus字段来区分状态

## 题目练习阶段完成/继续作答
练习阶段完成：样式统一，放在components/practice-complete下
继续作答：个性化ui,放在需要题型的comprise/answer-continue

## 题目
