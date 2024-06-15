-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2024 at 07:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_estimate`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `c_id` int(11) NOT NULL,
  `customer_id` varchar(200) NOT NULL,
  `c_name` varchar(200) NOT NULL,
  `c_phone` varchar(200) NOT NULL,
  `c_phone2` varchar(200) NOT NULL,
  `c_email` varchar(200) NOT NULL,
  `c_email2` varchar(200) NOT NULL,
  `c_address` varchar(2000) NOT NULL,
  `c_state` varchar(200) NOT NULL,
  `c_opening_balance` varchar(200) NOT NULL,
  `c_gst` varchar(200) NOT NULL,
  `c_pan` varchar(200) NOT NULL,
  `c_type` varchar(200) NOT NULL,
  `c_category` varchar(200) NOT NULL,
  `c_shipping_add` varchar(2000) NOT NULL,
  `c_billing_add` varchar(2000) NOT NULL,
  `c_current_date` date NOT NULL,
  `c_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`c_id`, `customer_id`, `c_name`, `c_phone`, `c_phone2`, `c_email`, `c_email2`, `c_address`, `c_state`, `c_opening_balance`, `c_gst`, `c_pan`, `c_type`, `c_category`, `c_shipping_add`, `c_billing_add`, `c_current_date`, `c_date`) VALUES
(3, 'cust3', 'prathamesh', '7743874058', '', 'a@a.c', '', '', '', '2220', '1ufvh3vhyu', 'vjh2vu3hcx', 'knkerrn k', 'category3', 'nhokwrhiuri', 'vvwjchvuy', '2024-05-11', NULL),
(10, 'cust4', 'pratik', '1211111111', '', 'a@a.c', '', '', '', '111', 'jljcsalksccbkjk', 'mwkhnbj jc', '', '', 'Bangalore', 'Nagpur', '2024-05-15', NULL),
(11, 'cust11', 'shivam', '1234567890', '', 's@g.v', '', '', '', '2222', 'dwqfry9iyieryim', 'jjwjj34565', '', '', 'bfhthhbb', 'fgtfghh', '2024-06-04', NULL),
(12, 'cust12', 'mayur', '1234567890', '', 'm@g.c', '', '', '', '420', '123456789012345', 'gfxdgfd123', '', '', 'chor bazar', 'shaitan gali', '2024-06-07', NULL),
(13, 'cust13', 'Toshik Kalbande', '9022055615', '', 't@g.c', '', '', '', '420', '123456789012345', 'fgssgw1234', '', '', 'Nagpur', 'Nagpur', '2024-06-08', NULL),
(14, 'cust14', 'Abhishek Kalbande', '7743874058', '', 'a@g.c', '', '', '', '1000', '123456789012345', '1234567890', '', '', 'nagpur', 'Goa', '2024-06-09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `estimate`
--

CREATE TABLE `estimate` (
  `est_id` int(11) NOT NULL,
  `est_no` varchar(200) NOT NULL,
  `customer_no` varchar(200) NOT NULL,
  `product_id` varchar(200) NOT NULL,
  `est_date` date NOT NULL,
  `est_valid_date` date NOT NULL,
  `estd_id` varchar(200) NOT NULL,
  `est_dua_day` decimal(10,2) NOT NULL,
  `est_description` varchar(2000) NOT NULL,
  `est_shipping_add` varchar(2000) NOT NULL,
  `est_billing_add` varchar(2000) NOT NULL,
  `est_customer_name` varchar(200) NOT NULL,
  `est_taxable_amount` decimal(10,2) NOT NULL,
  `est_sgst` decimal(10,2) NOT NULL,
  `est_cgst` decimal(10,2) NOT NULL,
  `est_igst` decimal(10,2) NOT NULL,
  `est_discount` decimal(10,2) NOT NULL,
  `est_freight` decimal(10,2) NOT NULL,
  `est_freight_tax` decimal(10,2) NOT NULL,
  `est_freight_total` decimal(10,2) NOT NULL,
  `est_grand_total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estimate`
--

INSERT INTO `estimate` (`est_id`, `est_no`, `customer_no`, `product_id`, `est_date`, `est_valid_date`, `estd_id`, `est_dua_day`, `est_description`, `est_shipping_add`, `est_billing_add`, `est_customer_name`, `est_taxable_amount`, `est_sgst`, `est_cgst`, `est_igst`, `est_discount`, `est_freight`, `est_freight_tax`, `est_freight_total`, `est_grand_total`) VALUES
(4, 'UT/QO/24-25 4', 'cust3', '', '2024-06-12', '2024-07-12', '', 30.00, '', '', '', 'prathamesh', 3900.00, 386.00, 386.00, 0.00, 0.00, 0.00, 0.00, 0.00, 4672.00),
(5, 'UT/QO/24-25 5', 'cust14', '', '2024-06-12', '2024-07-12', '', 30.00, '', 'nagpur', 'Goa', 'Abhishek Kalbande', 2077.00, 121.16, 121.16, 0.00, 0.00, 0.00, 0.00, 0.00, 2319.31),
(6, 'UT/QO/24-25 6', 'cust11', '', '2024-06-12', '2024-07-12', '', 30.00, '', 'bfhthhbb', 'fgtfghh', 'shivam', 2930.00, 121.71, 121.71, 0.00, 626.00, 700.00, 18.00, 826.00, 3200.00);

-- --------------------------------------------------------

--
-- Table structure for table `estimate_details`
--

CREATE TABLE `estimate_details` (
  `estd_id` int(11) NOT NULL,
  `est_id` varchar(200) NOT NULL,
  `product_no` varchar(200) NOT NULL,
  `estd_item_name` varchar(200) NOT NULL,
  `estd_description` varchar(200) NOT NULL,
  `estd_HSN` int(8) NOT NULL,
  `estd_rate` decimal(10,2) NOT NULL,
  `estd_quantity` int(11) NOT NULL,
  `estd_cgst` decimal(10,2) NOT NULL,
  `estd_sgst` decimal(10,2) NOT NULL,
  `estd_igst` decimal(10,2) NOT NULL,
  `estd_discount` decimal(10,2) NOT NULL,
  `estd_amount` decimal(10,2) NOT NULL,
  `estd_dis_amt` varchar(200) NOT NULL,
  `estd_dis_per` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estimate_details`
--

INSERT INTO `estimate_details` (`estd_id`, `est_id`, `product_no`, `estd_item_name`, `estd_description`, `estd_HSN`, `estd_rate`, `estd_quantity`, `estd_cgst`, `estd_sgst`, `estd_igst`, `estd_discount`, `estd_amount`, `estd_dis_amt`, `estd_dis_per`) VALUES
(5, '4', 'prod9', 'remote', '', 1234567890, 12.00, 1, 6.00, 6.00, 0.00, 0.00, 2240.00, '0', '0'),
(6, '4', 'prod11', 'Router', '', 12346789, 28.00, 1, 14.00, 14.00, 0.00, 0.00, 2432.00, '0', '0'),
(7, '5', 'prod8', 'web site', '', 11111, 3.00, 1, 1.50, 1.50, 0.00, 0.00, 79.31, '0', '0'),
(8, '5', 'prod9', 'remote', '', 1234567890, 12.00, 1, 6.00, 6.00, 0.00, 0.00, 2240.00, '0', '0'),
(9, '6', 'prod8', 'web site', '', 11111, 3.00, 1, 1.50, 1.50, 0.00, 0.00, 1000.00, '107.00', '10'),
(10, '6', 'prod9', 'remote', '', 1234567890, 12.00, 1, 6.00, 6.00, 0.00, 0.00, 2000.00, '93.00', '5');

-- --------------------------------------------------------

--
-- Table structure for table `master_company`
--

CREATE TABLE `master_company` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `comapny_address1` varchar(2000) NOT NULL,
  `comapny_address2` varchar(2000) NOT NULL,
  `comapny_city` varchar(200) NOT NULL,
  `company_state` varchar(200) NOT NULL,
  `company_email1` varchar(200) NOT NULL,
  `company_email2` varchar(200) NOT NULL,
  `company_website` varchar(200) NOT NULL,
  `company_phone1` varchar(200) NOT NULL,
  `company_phone2` varchar(200) NOT NULL,
  `company_gst` varchar(200) NOT NULL,
  `company_pan` varchar(200) NOT NULL,
  `company_bank_name` varchar(200) NOT NULL,
  `company_account_number` varchar(200) NOT NULL,
  `company_ifce_code` varchar(200) NOT NULL,
  `company_terms` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `p_id` int(11) NOT NULL,
  `product_id` varchar(200) NOT NULL,
  `p_name` varchar(200) NOT NULL,
  `p_hsn_code` varchar(200) NOT NULL,
  `p_opening_stock` int(11) NOT NULL,
  `p_opening_stock-date` date NOT NULL,
  `p_low_stock_alert` varchar(200) NOT NULL,
  `p_main_stock` varchar(200) NOT NULL,
  `p_selling_price` varchar(200) NOT NULL,
  `p_selling_tax` varchar(200) NOT NULL,
  `p_purchase_price` varchar(200) NOT NULL,
  `p_purchase_tax` varchar(200) NOT NULL,
  `p_product_unit` varchar(200) NOT NULL,
  `p_date` date NOT NULL,
  `p_current_date` date NOT NULL,
  `p_is_tax` varchar(200) NOT NULL,
  `p_item_type` varchar(200) NOT NULL,
  `p_category` varchar(200) NOT NULL,
  `p_description` varchar(2000) NOT NULL,
  `p_master_tax` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`p_id`, `product_id`, `p_name`, `p_hsn_code`, `p_opening_stock`, `p_opening_stock-date`, `p_low_stock_alert`, `p_main_stock`, `p_selling_price`, `p_selling_tax`, `p_purchase_price`, `p_purchase_tax`, `p_product_unit`, `p_date`, `p_current_date`, `p_is_tax`, `p_item_type`, `p_category`, `p_description`, `p_master_tax`) VALUES
(8, 'prod8', 'web site', '11111', 111, '0000-00-00', '', '', '77', '12', '66', 'Without Tax', 'm', '0000-00-00', '2024-05-14', '', 'Service', 'IT', 'jhvjecvljucr jvbjcwbeuj cxsiue3 ', 3.00),
(10, 'prod9', 'remote', '1234567890', 20, '0000-00-00', '', '', '2000', '', '100', '', 'k', '0000-00-00', '2024-06-06', '', 'Product', 'hardware', 'xyz', 12.00),
(11, 'prod11', 'Router', '12346789', 200, '0000-00-00', '', '', '1900', '', '1200', '', 'p', '0000-00-00', '2024-06-06', '', 'Product', 'cctv', 'sbbb', 28.00),
(12, 'prod12', 'server', '213456788', 200, '0000-00-00', '', '', '750', '', '500', '', 'p', '0000-00-00', '2024-06-09', '', 'Product', 'IT', '', 28.00);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES
(1, 'admin', 'admin@123', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `estimate`
--
ALTER TABLE `estimate`
  ADD PRIMARY KEY (`est_id`);

--
-- Indexes for table `estimate_details`
--
ALTER TABLE `estimate_details`
  ADD PRIMARY KEY (`estd_id`);

--
-- Indexes for table `master_company`
--
ALTER TABLE `master_company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `estimate`
--
ALTER TABLE `estimate`
  MODIFY `est_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `estimate_details`
--
ALTER TABLE `estimate_details`
  MODIFY `estd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `master_company`
--
ALTER TABLE `master_company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
