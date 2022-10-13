-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2021 at 07:08 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chess`
--

-- --------------------------------------------------------

--
-- Table structure for table `chess_challenges`
--

CREATE TABLE `chess_challenges` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fromUserId` int(10) UNSIGNED NOT NULL,
  `toUserId` int(10) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `roomId` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `score` varchar(50) NOT NULL,
  `challenge_amount` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chess_save`
--

CREATE TABLE `chess_save` (
  `id` int(20) NOT NULL,
  `name` datetime NOT NULL,
  `fen` varchar(200) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chess_save`
--

INSERT INTO `chess_save` (`id`, `name`, `fen`, `userId`) VALUES
(9, '2021-03-19 18:17:57', 'rnbqk1nr/pppp1ppp/3bp3/8/5P2/4P3/PPPP2PP/RNBQKBNR w KQkq - 0 1', 9),
(10, '2021-03-19 18:17:59', 'rnbqk1nr/pppp1ppp/3bp3/8/5P2/4P3/PPPP2PP/RNBQKBNR w KQkq - 0 1', 9),
(11, '2021-03-19 18:17:59', 'rnbqk1nr/pppp1ppp/3bp3/8/5P2/4P3/PPPP2PP/RNBQKBNR w KQkq - 0 1', 9),
(12, '2021-03-19 18:18:00', 'rnbqk1nr/pppp1ppp/3bp3/8/5P2/4P3/PPPP2PP/RNBQKBNR w KQkq - 0 1', 9),
(13, '2021-03-19 19:10:52', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 9),
(14, '2021-03-26 22:02:56', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 13),
(15, '2021-03-31 17:16:22', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 15);

-- --------------------------------------------------------

--
-- Table structure for table `chess_users`
--

CREATE TABLE `chess_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `score` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chess_users`
--

INSERT INTO `chess_users` (`id`, `username`, `password`, `score`) VALUES
(2, 'test1', 'test1', 0),
(3, 'test2', 'test2', 0),
(4, 'test3', 'test3', 0),
(5, 'test4', 'test4', 0),
(6, 'test5', 'test5', 0),
(7, 'test6', 'test6', 0),
(8, 'test7', 'test7', 0),
(9, 'test', 'test', 0),
(10, 'sdf', 'sdfs', 0);

-- --------------------------------------------------------

--
-- Table structure for table `w_users`
--

CREATE TABLE `w_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `private_key` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `w_users`
--

INSERT INTO `w_users` (`id`, `username`, `address`, `private_key`, `password`, `score`) VALUES
(21, 'asd', '0xE47b1e528eD8818F09bA140a18F2585Cd682fF77', '0x0395102a854a0755d38745e8794e2e5c11f7a50aa28204ea68e453c8e0f2fb72', 'asd', 6),
(22, 'admin', '0x413EBD57EbA0f200ed592c31E7dB6119C92A7973', '', 'admin', 0),
(23, 'qwe', '0x85994927Ac93F38A2a029921728C99c08139589D', '0x7ff488ee5bfc91aaf7dd84382a1d0e2245cd9a1a18adcc2a1be74e4e41f53262', 'qwe', 8),
(24, 'qqqq', '0xE3d7f543CA5C1a2E736418494FC8C00f062dfe12', '0x96c9b63bba170ab93502c997d94e697bfcd793496964947996cd2317cc4e9abb', 'qqqq', 0),
(25, 'aaa', '0x8A7478E1C506bbe2b8B2EA5Cdef05465bDC24868', '0x5ea3e356000bef16014c01b7653ea7154a540ff2c36035a43e414cf65de2c4ec', 'aaa', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chess_challenges`
--
ALTER TABLE `chess_challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chess_save`
--
ALTER TABLE `chess_save`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chess_users`
--
ALTER TABLE `chess_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `w_users`
--
ALTER TABLE `w_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chess_challenges`
--
ALTER TABLE `chess_challenges`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `chess_save`
--
ALTER TABLE `chess_save`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `chess_users`
--
ALTER TABLE `chess_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `w_users`
--
ALTER TABLE `w_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
