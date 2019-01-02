/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : paichusuo

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 11/12/2018 22:27:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for coparea
-- ----------------------------
DROP TABLE IF EXISTS `coparea`;
CREATE TABLE `coparea`  (
  `id` bigint(8) NOT NULL AUTO_INCREMENT,
  `manageArea` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `areaId` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `placeId` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coparea
-- ----------------------------
INSERT INTO `coparea` VALUES (1, '长河社区', 'CH', '彩虹城', 'CH001', '2018-11-11 18:34:17', '2018-11-11 18:34:20', 1);
INSERT INTO `coparea` VALUES (2, '长河社区', 'CH', '连连大厦', 'CH002', '2018-11-11 18:28:37', '2018-11-11 18:28:37', 1);
INSERT INTO `coparea` VALUES (3, '长河社区', 'CH', '中控科技园', 'CH003', '2018-11-11 18:28:53', '2018-11-11 18:28:53', 1);
INSERT INTO `coparea` VALUES (4, '长河社区', 'CH', '杭州长河高级中学', 'CH004', '2018-11-11 18:30:12', '2018-11-11 18:30:12', 1);
INSERT INTO `coparea` VALUES (5, '长河社区', 'CH', '杭州龙禧大酒店', 'CH005', '2018-11-11 18:31:09', '2018-11-11 18:31:09', 1);
INSERT INTO `coparea` VALUES (6, '长河社区', 'CH', '滨江龙湖天街', 'CH006', '2018-11-11 18:31:37', '2018-11-11 18:31:37', 1);
INSERT INTO `coparea` VALUES (7, '长河社区', 'CH', '中心花园', 'CH007', '2018-11-11 18:31:52', '2018-11-11 18:31:52', 1);
INSERT INTO `coparea` VALUES (8, '长河社区', 'CH', '好歌汇量贩KTV', 'CH008', '2018-11-11 18:33:08', '2018-11-11 18:33:08', 1);
INSERT INTO `coparea` VALUES (9, '长河社区', 'CH', '浙江大学医学院附属儿童医院', 'CH009', '2018-11-11 18:33:52', '2018-11-11 18:33:52', 1);
INSERT INTO `coparea` VALUES (10, '长河社区', 'CH', '宝龙城', 'CH010', '2018-11-11 18:34:13', '2018-11-11 18:34:13', 1);
INSERT INTO `coparea` VALUES (11, '张家村社区', 'ZJC', '冠山小区', 'ZJC001', '2018-11-11 18:36:37', '2018-11-11 18:36:40', 1);
INSERT INTO `coparea` VALUES (12, '张家村社区', 'ZJC', '华数数字电视产业园', 'ZJC002', '2018-11-11 18:39:10', '2018-11-11 18:39:10', 1);
INSERT INTO `coparea` VALUES (13, '张家村社区', 'ZJC', '杭州白马湖国际会展中心', 'ZJC003', '2018-11-11 18:39:40', '2018-11-11 18:39:40', 1);

-- ----------------------------
-- Table structure for copinfo
-- ----------------------------
/*DROP TABLE IF EXISTS `copinfo`;
CREATE TABLE `copinfo`  (
  `id` int(8) NOT NULL,
  `cop_id` bigint(16) NOT NULL,
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cop_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cop_sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` date NULL DEFAULT NULL,
  `role_flag` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `manage_area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;*/

-- ----------------------------
-- Table structure for coptask
-- ----------------------------
DROP TABLE IF EXISTS `coptask`;
CREATE TABLE `coptask`  (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `son_task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_category` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cop_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '警员号',
  `cop_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_area` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区域',
  `place` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '详细地址',
  `task_detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `deadline` timestamp(0) NULL DEFAULT NULL,
  `delay_deadline` timestamp(0) NULL DEFAULT NULL,
  `finish_time` timestamp(0) NULL DEFAULT NULL,
  `finish_status` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coptask
-- ----------------------------
INSERT INTO `coptask` VALUES (1, '8cc60ed8face11e89bee00ffe725274a', 'e2fdf72fee2a11e887e7000ec6a06ad6', 'SEXY', 'b002', '华音', 'ZJC', 'ZJC002', '最后一次', '2018-12-08 05:49:09', NULL, NULL, 'TODO', '2018-12-11 21:51:07', '2018-12-11 21:51:07', 1);
INSERT INTO `coptask` VALUES (2, '4266bff8fad411e89bee00ffe725274a', 'e2fdf72fee2a11e887e7000ec6a06ad6', 'SEXY', 'b003', '杭家豪', 'ZJC', 'ZJC001', 'jnhoj', '2018-12-08 06:30:05', NULL, NULL, 'TODO', '2018-12-11 21:51:15', '2018-12-11 21:51:15', 1);
INSERT INTO `coptask` VALUES (3, 'b1ae586ffad511e89bee00ffe725274a', 'e2fdf72fee2a11e887e7000ec6a06ad6', 'SEXY', 'a001', '张杰', 'ZJC', 'ZJC003', '给女方家', '2018-12-08 06:40:30', NULL, NULL, 'TODO', '2018-12-11 21:51:24', '2018-12-11 21:51:24', 1);
INSERT INTO `coptask` VALUES (4, 'f77a3ef1fd4811e8aacf00ffe725274a', 'a2b6ca70fc4711e89bee00ffe725274a', 'DRUGS', 'b003', '杭家豪', 'CH', 'CH009', '1.医院特殊药品进出监管是否正常\r\n2.医院是否存在滥用药物，蓝开特殊处方药品情况', '2018-12-26 12:00:00', NULL, NULL, 'TODO', '2018-12-11 21:30:46', '2018-12-11 21:30:46', 1);
INSERT INTO `coptask` VALUES (5, '15af2785fd4911e8aacf00ffe725274a', 'a2b6ca70fc4711e89bee00ffe725274a', 'DRUGS', 'b002', '华音', 'CH', 'CH001', '吸毒人员排查', '2018-12-26 12:00:00', NULL, NULL, 'TODO', '2018-12-11 21:31:37', '2018-12-11 21:31:37', 1);
INSERT INTO `coptask` VALUES (6, '33908364fd4911e8aacf00ffe725274a', 'a2b6ca70fc4711e89bee00ffe725274a', 'DRUGS', 'a001', '张杰', 'CH', 'CH008', '吸毒贩毒情况突击检查', '2018-12-26 12:00:00', NULL, NULL, 'TODO', '2018-12-11 21:32:27', '2018-12-11 21:32:27', 1);

-- ----------------------------
-- Table structure for firecontrol
-- ----------------------------
DROP TABLE IF EXISTS `firecontrol`;
CREATE TABLE `firecontrol`  (
  `id` int(8) NOT NULL,
  `sonTaskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `taskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `copId` bigint(16) NOT NULL,
  `finishTime` date NULL DEFAULT NULL,
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fireEquipment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `firePassage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `other` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for focuspeople
-- ----------------------------
DROP TABLE IF EXISTS `focuspeople`;
CREATE TABLE `focuspeople`  (
  `id` int(8) NOT NULL,
  `residenName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `residentId` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `residence` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `focusReason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gambling
-- ----------------------------
DROP TABLE IF EXISTS `gambling`;
CREATE TABLE `gambling`  (
  `id` int(8) NOT NULL,
  `sonTaskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `taskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `copId` bigint(16) NOT NULL,
  `finishTime` date NULL DEFAULT NULL,
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gambleNum` int(8) NOT NULL,
  `gambleAmount` double(20, 2) NOT NULL,
  `other` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for leave
-- ----------------------------
DROP TABLE IF EXISTS `leave`;
CREATE TABLE `leave`  (
  `id` int(8) NOT NULL,
  `copId` bigint(16) NOT NULL,
  `startTime` date NOT NULL,
  `finishTime` date NOT NULL,
  `LeaveReason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pass` int(1) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Resident
-- ----------------------------
DROP TABLE IF EXISTS `resident`;
CREATE TABLE `resident`  (
  `id` int(8) NOT NULL,
  `sonTaskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `taskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `copId` bigint(16) NOT NULL,
  `village` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `roomNum` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `residenName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `residentId` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `focus` int(1) NULL DEFAULT NULL,
  `resideInfo` int(1) NULL DEFAULT NULL,
  `other` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sexy
-- ----------------------------
DROP TABLE IF EXISTS `sexy`;
CREATE TABLE `sexy`  (
  `id` int(8) NOT NULL,
  `sonTaskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `taskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `copId` bigint(16) NOT NULL,
  `finishTime` date NULL DEFAULT NULL,
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sexyNum` int(8) NOT NULL,
  `other` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for taskfinish
-- ----------------------------
DROP TABLE IF EXISTS `taskfinish`;
CREATE TABLE `taskfinish`  (
  `id` int(8) NOT NULL,
  `taskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isFinish` int(1) NOT NULL,
  `finishTime` date NOT NULL,
  `copId` bigint(16) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `update_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for taskinfo
-- ----------------------------
DROP TABLE IF EXISTS `taskinfo`;
CREATE TABLE `taskinfo`  (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_category` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `issue_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `deadline` timestamp(0) NOT NULL,
  `task_detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `task_area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publisher` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `finish_status` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `allocate_status` int(8) NULL DEFAULT NULL,
  `archive` smallint(6) NOT NULL DEFAULT 1 COMMENT '-1.删除；0.禁用；1.启用',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `task_id_index`(`task_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taskinfo
-- ----------------------------
INSERT INTO `taskinfo` VALUES (2, '2cf0a5ddd8e811e891a4000ec6a06ad6', 'SEXY', '2018-12-11 21:53:11', '2018-12-16 00:00:00', '打黄扫非,突击检查', 'CH', '数据库测试者', 'TODO', '2018-12-11 21:53:11', '2018-12-11 21:53:11', NULL, 1);
INSERT INTO `taskinfo` VALUES (8, '0a62af1ee87811e887e7000ec6a06ad6', 'DRUGS', '2018-12-11 22:08:03', '2018-11-15 00:00:00', '毒品大清扫', 'CH', '所长', 'INTERRUPTED', '2018-12-11 22:08:03', '2018-12-11 22:08:03', NULL, 1);
INSERT INTO `taskinfo` VALUES (9, '97f14158e89a11e887e7000ec6a06ad6', 'GAMBLE', '2018-11-13 00:00:00', '2018-11-20 00:00:00', '赌博全面排查', 'CH', '所长', 'TODO', '2018-11-15 13:52:09', '2018-11-15 13:52:09', NULL, 1);
INSERT INTO `taskinfo` VALUES (10, '504bf194ee1d11e887e7000ec6a06ad6', 'FIRE', '2018-12-11 21:52:25', '2018-11-29 00:00:00', '消防大排查', 'ZJC', '修改者', 'TODO', '2018-12-11 21:52:25', '2018-12-11 21:52:25', NULL, 1);
INSERT INTO `taskinfo` VALUES (11, 'e2fdf72fee2a11e887e7000ec6a06ad6', 'SEXY', '2018-12-11 21:53:07', '2018-12-26 00:00:00', '打黄扫非,突击检查', 'ZJC', '数据库测试者', 'TODO', '2018-12-11 22:25:50', '2018-12-11 22:25:50', 1, 1);
INSERT INTO `taskinfo` VALUES (12, 'c25f588ff37911e887e7000ec6a06ad6', 'GAMBLE', '2018-11-29 09:53:59', '2018-12-06 09:50:45', '麻将棋牌赌博严查', 'ZJC', '副所长', 'TODO', '2018-11-29 09:54:31', '2018-11-29 09:54:31', NULL, 1);
INSERT INTO `taskinfo` VALUES (13, 'a2b6ca70fc4711e89bee00ffe725274a', 'DRUGS', '2018-12-11 21:32:31', '2018-12-31 02:45:31', '药品，食品制剂排查', 'CH', '干脆面', 'TODO', '2018-12-11 22:25:24', '2018-12-11 22:25:24', 1, 1);

-- ----------------------------
-- Table structure for tasksummary
-- ----------------------------
DROP TABLE IF EXISTS `tasksummary`;
CREATE TABLE `tasksummary`  (
  `id` int(8) NOT NULL,
  `taskId` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `taskCategory` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `finishTime` date NULL DEFAULT NULL,
  `copId` bigint(16) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `update_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
