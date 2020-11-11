USE [master]
GO
/****** Object:  Database [E_learning]    Script Date: 3/23/2020 10:06:46 AM ******/
CREATE DATABASE [E_learning]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'E_learning', FILENAME = N'D:\Elerning\E_learning.mdf' , SIZE = 3264KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'E_learning_log', FILENAME = N'D:\Elerning\E_learning_log.ldf' , SIZE = 816KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [E_learning] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [E_learning].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [E_learning] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [E_learning] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [E_learning] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [E_learning] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [E_learning] SET ARITHABORT OFF 
GO
ALTER DATABASE [E_learning] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [E_learning] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [E_learning] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [E_learning] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [E_learning] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [E_learning] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [E_learning] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [E_learning] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [E_learning] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [E_learning] SET  ENABLE_BROKER 
GO
ALTER DATABASE [E_learning] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [E_learning] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [E_learning] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [E_learning] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [E_learning] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [E_learning] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [E_learning] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [E_learning] SET RECOVERY FULL 
GO
ALTER DATABASE [E_learning] SET  MULTI_USER 
GO
ALTER DATABASE [E_learning] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [E_learning] SET DB_CHAINING OFF 
GO
ALTER DATABASE [E_learning] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [E_learning] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [E_learning] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'E_learning', N'ON'
GO
USE [E_learning]
GO
USE [E_learning]
GO
/****** Object:  Sequence [dbo].[hibernate_sequence]    Script Date: 3/23/2020 10:06:46 AM ******/
CREATE SEQUENCE [dbo].[hibernate_sequence] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Table [dbo].[add_point]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[add_point](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[add_point] [int] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_round_test] [bigint] NULL,
	[id_type_question] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[answer]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[answer](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[answer] [int] NOT NULL,
	[answer_code] [nvarchar](255) NULL,
	[contents] [text] NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_question] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[candidates]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[candidates](
	[id] [bigint] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[status_candidates] [int] NULL,
	[time_create] [datetime2](7) NULL,
	[id_group_test] [bigint] NULL,
	[id_round_test] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[certificatee]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[certificatee](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[status_certificatee] [int] NULL,
	[time_create] [datetime2](7) NULL,
	[url_certificatee] [nvarchar](255) NULL,
	[id_round_test] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[chapter]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chapter](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[name] [nvarchar](255) NULL,
	[id_outline] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[chapter_freedom_lecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chapter_freedom_lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[position] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_freedom_lecture] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[chapter_home_work]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chapter_home_work](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[position] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_home_work] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[chapter_powerpointlecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chapter_powerpointlecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[position] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_powerpoint_lecture] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[chapter_scorm_lecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chapter_scorm_lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[position] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_scorm_lecture] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[chapter_video_lecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chapter_video_lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[position] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_video_lecture] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[comments]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comments](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[contents] [nvarchar](255) NULL,
	[id_course] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[commune_vnpost]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[commune_vnpost](
	[commune_code] [nvarchar](1) NOT NULL,
	[commune_name] [nvarchar](255) NULL,
	[district_code] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[commune_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[competition]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[competition](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describe] [text] NULL,
	[image_competition] [varchar](255) NULL,
	[last_update] [datetime2](7) NULL,
	[name_competition] [nvarchar](255) NULL,
	[status_competition] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[time_end] [datetime2](7) NULL,
	[time_start] [datetime2](7) NULL,
	[id_competition_category] [bigint] NULL,
	[id_unit] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[competition_category]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[competition_category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describes] [varchar](255) NULL,
	[last_update] [datetime2](7) NULL,
	[name_competition] [varchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[condition]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[condition](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_condition] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[config_report]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[config_report](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[config_filter] [text] NULL,
	[data_sources] [text] NULL,
	[last_update] [datetime2](7) NULL,
	[name_config] [nvarchar](255) NULL,
	[name_file] [nvarchar](255) NULL,
	[status_config] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
	[url_config] [nvarchar](255) NULL,
	[id_group_report] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[configurationn]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[configurationn](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[status_configurationn] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[value_configurationn] [text] NULL,
	[id_type_data] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[course]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[avatar] [nvarchar](255) NULL,
	[code] [nvarchar](255) NULL,
	[description] [text] NULL,
	[highlight] [int] NOT NULL,
	[name] [nvarchar](255) NULL,
	[price] [int] NOT NULL,
	[show_name] [int] NOT NULL,
	[status] [int] NOT NULL,
	[stepbystep] [int] NOT NULL,
	[id_course_category] [bigint] NULL,
	[idposcode_vnpost] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[course_category_tree]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_category_tree](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_course_category_one] [bigint] NULL,
	[id_course_catgeory_two] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[course_config]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_config](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[approve_auto] [int] NOT NULL,
	[end_learning] [datetime2](7) NULL,
	[ends] [datetime2](7) NULL,
	[freedom_register] [int] NOT NULL,
	[register_end] [datetime2](7) NULL,
	[register_start] [datetime2](7) NULL,
	[start_learning] [datetime2](7) NULL,
	[starts] [datetime2](7) NULL,
	[id_course] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[course_course]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_course](
	[id_course2] [bigint] NOT NULL,
	[id_course] [bigint] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[course_document]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_document](
	[id_document] [bigint] NOT NULL,
	[id_course] [bigint] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[course_join]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_join](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[status] [int] NOT NULL,
	[id_course] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[course_requirement]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_requirement](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_course] [bigint] NULL,
	[id_positionname] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[course_role]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[course_role](
	[id] [bigint] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_course] [varchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[course_ware]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_ware](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[coursecategory]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[coursecategory](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[detail_category_event]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detail_category_event](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_detail] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[detail_permisstion]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detail_permisstion](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_detail] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
	[id_permistion] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[district]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[district](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[district_vnpost]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[district_vnpost](
	[district_code] [bigint] NOT NULL,
	[description] [nvarchar](255) NULL,
	[district_name] [nvarchar](255) NULL,
	[province_code] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[district_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[document]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[document](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describes] [text] NULL,
	[last_update] [datetime2](7) NULL,
	[link_file] [text] NULL,
	[name_document] [varchar](255) NULL,
	[shares] [int] NOT NULL,
	[status_document] [int] NULL,
	[time_create] [datetime2](7) NULL,
	[id_document_category] [bigint] NULL,
	[id_limit] [bigint] NULL,
	[id_unit] [bigint] NULL,
	[id_prioritize] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[document_category]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[document_category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describes] [text] NULL,
	[last_update] [datetime2](7) NULL,
	[name_document] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[eventt]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[eventt](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[highlinght_event] [int] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[time_end] [datetime2](7) NULL,
	[time_start] [datetime2](7) NULL,
	[id_detail_category_event] [bigint] NULL,
	[id_unit] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[formemail]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[formemail](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[functionemail] [nvarchar](255) NULL,
	[last_update] [datetime2](7) NULL,
	[name_form] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[freedom_lecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[freedom_lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[contents] [text] NULL,
	[description] [text] NULL,
	[name] [nvarchar](255) NULL,
	[shared] [int] NOT NULL,
	[stored] [int] NOT NULL,
	[id_course_ware] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[freedom_lecture_process]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[freedom_lecture_process](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[time_learn] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_freedom_lecture] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[group_report]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group_report](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_group] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[group_test]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group_test](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name_group] [nvarchar](255) NULL,
	[id_round_test] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[groupposition]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[groupposition](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name_group] [nvarchar](255) NULL,
	[id_unit] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[groups]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[groups](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[name] [nvarchar](255) NULL,
	[id_course] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[help_desk]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[help_desk](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](255) NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[home_work]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[home_work](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[contents] [text] NULL,
	[description] [text] NULL,
	[ends] [datetime2](7) NULL,
	[files] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[shared] [int] NOT NULL,
	[starts] [datetime2](7) NULL,
	[status] [int] NOT NULL,
	[stored] [int] NOT NULL,
	[id_course_ware] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[home_work_answer]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[home_work_answer](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[contents] [text] NULL,
	[files] [nvarchar](255) NULL,
	[id_home_work_lecture_process] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[home_work_lecture_process]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[home_work_lecture_process](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[score] [int] NOT NULL,
	[status] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_home_work] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[image_slide_show]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[image_slide_show](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[link_image] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[inter_active_lecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inter_active_lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[contents] [text] NULL,
	[name] [nvarchar](255) NULL,
	[status] [int] NOT NULL,
	[stored] [int] NOT NULL,
	[id_course_ware] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[inter_active_lecture_chapter]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inter_active_lecture_chapter](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[position] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_inter_active_lecture] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[inter_active_lectureprocess]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inter_active_lectureprocess](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[comments] [nvarchar](255) NULL,
	[contents] [text] NULL,
	[status] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_inter_active_lecture] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[kind_position_name]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[kind_position_name](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name_postion] [nvarchar](255) NULL,
	[id_groupposition] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[levell]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[levell](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_levell] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[limit_document]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[limit_document](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name_limit] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[mail_contact]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mail_contact](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[contents] [text] NULL,
	[email] [nvarchar](255) NULL,
	[last_update] [datetime2](7) NULL,
	[name] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[method]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[method](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_method] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[mix_competition]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mix_competition](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name_mix] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[new_category]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[new_category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_detail] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[news]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[news](
	[id] [bigint] NOT NULL,
	[highlight_new] [int] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[status_new] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[title] [nvarchar](255) NULL,
	[id_detail_category] [bigint] NULL,
	[id_unit] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[outline]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[outline](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[id_course] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[permistion]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permistion](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[codename] [nvarchar](255) NULL,
	[name_permistion] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[poscode_vnpost]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[poscode_vnpost](
	[poscode] [bigint] NOT NULL,
	[address] [nvarchar](255) NULL,
	[is_offline] [nvarchar](255) NULL,
	[poslevel_code] [nvarchar](255) NULL,
	[posname] [nvarchar](255) NULL,
	[status] [nvarchar](255) NULL,
	[postype_code] [nvarchar](255) NULL,
	[commune_code] [nvarchar](1) NULL,
	[unit_code] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[poscode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[poscode_vnpost_course]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[poscode_vnpost_course](
	[id_poscode_vnpost] [bigint] NOT NULL,
	[id_course] [bigint] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[position_name]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[position_name](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name_position] [nvarchar](255) NULL,
	[request_content] [text] NULL,
	[id_kind_position] [bigint] NULL,
	[id_racing] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[powerpoint_lecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[powerpoint_lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[description] [text] NULL,
	[files] [text] NULL,
	[name] [nvarchar](255) NULL,
	[shared] [int] NOT NULL,
	[stored] [int] NOT NULL,
	[totallearn] [int] NULL,
	[id_course_ware] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[powerpoint_lecture_process]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[powerpoint_lecture_process](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_view] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_powerpoint_lecture] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[prioritize]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[prioritize](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_prioritize] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[province_vnpost]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[province_vnpost](
	[province_code] [bigint] NOT NULL,
	[description] [nvarchar](255) NULL,
	[province_name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[province_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[provine]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[provine](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[id_district] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[question]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[question](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[explain] [varchar](max) NULL,
	[last_update] [datetime2](7) NULL,
	[mix] [int] NOT NULL,
	[question] [text] NULL,
	[status_question] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[id_level] [bigint] NULL,
	[id_question_category] [bigint] NULL,
	[id_tag] [bigint] NULL,
	[id_type_question] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[question_category]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[question_category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describes] [nvarchar](255) NULL,
	[last_update] [datetime2](7) NULL,
	[name_category] [nvarchar](255) NULL,
	[shares] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[id_unit] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[question_round_test]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[question_round_test](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_question] [bigint] NULL,
	[id_round_test] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[question_test]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[question_test](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_question] [bigint] NULL,
	[id_test] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[racing_position_name]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[racing_position_name](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describes] [nvarchar](255) NULL,
	[racing_name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[rate]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rate](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[valuess] [int] NOT NULL,
	[id_course] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[requirement_test]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[requirement_test](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_competition] [bigint] NULL,
	[id_positionname] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[result]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[result](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[answer] [text] NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[time_end] [datetime2](7) NULL,
	[time_start] [datetime2](7) NULL,
	[id_question] [bigint] NULL,
	[id_round_test] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[role_course_action]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_course_action](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_action_course] [bigint] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_action] [nvarchar](255) NULL,
	[status_action] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[id_course_role] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[round_test]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[round_test](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[auto_create_question] [int] NOT NULL,
	[code_round_test] [nvarchar](255) NULL,
	[describes] [text] NULL,
	[do_again] [int] NOT NULL,
	[full_tick_answer] [int] NOT NULL,
	[give_certificate] [int] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[max_point] [int] NOT NULL,
	[max_work] [int] NOT NULL,
	[min_point] [int] NOT NULL,
	[mix_answer] [int] NOT NULL,
	[name_round] [nvarchar](255) NULL,
	[show_resutl] [int] NOT NULL,
	[source_question] [int] NOT NULL,
	[status_round] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[time_end] [datetime2](7) NULL,
	[time_round] [datetime2](7) NULL,
	[time_start] [datetime2](7) NULL,
	[id_competition] [bigint] NULL,
	[id_condition] [bigint] NULL,
	[id_mix_compettion] [bigint] NULL,
	[id_struct_test] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[routeposition]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[routeposition](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describe] [text] NULL,
	[name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[scorm_lecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scorm_lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[files] [text] NULL,
	[is_flash] [int] NOT NULL,
	[name] [text] NULL,
	[shared] [int] NOT NULL,
	[stored] [int] NOT NULL,
	[total_time] [int] NOT NULL,
	[id_course_ware] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[scorm_lecture_process]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scorm_lecture_process](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[id_chapter] [bigint] NULL,
	[id_scorm_lecture] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[slide_show]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[slide_show](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describe] [text] NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[source_question]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[source_question](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_round_test] [bigint] NULL,
	[id_test_kit] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[statistical_action]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[statistical_action](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_statistical] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
	[time_up] [datetime2](7) NULL,
	[url_statistical] [nvarchar](255) NULL,
	[id_method] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[statistical_round_test]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[statistical_round_test](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[status_statistical] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[id_round_test] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[struct_test]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[struct_test](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[count_test] [int] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_group] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
	[id_level] [bigint] NULL,
	[id_unit] [bigint] NULL,
	[id_tag] [bigint] NULL,
	[id_type_question] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[sub_point]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sub_point](
	[id] [bigint] NOT NULL,
	[last_update] [datetime2](7) NULL,
	[sub] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[id_round_test] [bigint] NULL,
	[id_type_question] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[subjects]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[subjects](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describes] [nvarchar](255) NULL,
	[last_update] [datetime2](7) NULL,
	[name_subjects] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tags]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tags](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[test]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[test](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
	[type_test] [int] NOT NULL,
	[id_struct_test] [bigint] NULL,
	[id_test_kit] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[test_kit]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[test_kit](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describes] [text] NULL,
	[last_update] [datetime2](7) NULL,
	[name_test] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tree_category]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tree_category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_detail_category_one] [bigint] NULL,
	[id_detail_category_two] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tree_competition]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tree_competition](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_competition_category_one] [bigint] NULL,
	[id_competition_category_two] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tree_document]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tree_document](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_document_category_one] [bigint] NULL,
	[id_document_category_two] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tree_event]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tree_event](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_detail_category_event_one] [bigint] NULL,
	[id_detail_category_event_two] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tree_permistion]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tree_permistion](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_permistion_one] [bigint] NULL,
	[id_permistion_two] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tree_postion]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tree_postion](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[describes] [nvarchar](255) NULL,
	[levels] [int] NOT NULL,
	[id_positionname] [bigint] NULL,
	[id_routeposition] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tree_question]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tree_question](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_question_category_one] [bigint] NULL,
	[id_question_category_two] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tree_test_kit]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tree_test_kit](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_test_kid_one] [bigint] NULL,
	[id_test_kid_two] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[type_data]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[type_data](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_type] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[type_question]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[type_question](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[name_type] [nvarchar](255) NULL,
	[time_create] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[unit_vnpost]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[unit_vnpost](
	[unit_code] [bigint] NOT NULL,
	[unit_name] [nvarchar](255) NULL,
	[parent_unit_code] [nvarchar](255) NULL,
	[unit_type_code] [nvarchar](255) NULL,
	[commune_code] [nvarchar](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[unit_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user_course_group]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_course_group](
	[id_user] [bigint] NOT NULL,
	[id_group] [bigint] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user_permistion]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_permistion](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[time_create] [datetime2](7) NULL,
	[id_permistion] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user_role_course]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_role_course](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[last_update] [datetime2](7) NULL,
	[status] [int] NOT NULL,
	[time_create] [datetime2](7) NULL,
	[id_course] [bigint] NULL,
	[id_course_role] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[users]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[birthday] [datetime2](7) NULL,
	[email] [nvarchar](255) NULL,
	[sex] [int] NULL,
	[id_position] [bigint] NOT NULL,
	[image_users] [nvarchar](255) NULL,
	[last_update] [datetime2](7) NULL,
	[password] [nvarchar](255) NULL,
	[phone_number] [nvarchar](255) NULL,
	[place] [nvarchar](255) NULL,
	[status_users] [int] NULL,
	[time_create] [datetime2](7) NULL,
	[username] [nvarchar](255) NULL,
	[id_unit] [bigint] NULL,
	[id_ward] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[video_lecture]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[video_lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[description] [text] NULL,
	[files] [varchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[shared] [int] NOT NULL,
	[stored] [int] NOT NULL,
	[total_duration] [int] NOT NULL,
	[id_course_ware] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[video_lecture_process]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[video_lecture_process](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[created_by] [nvarchar](255) NULL,
	[created_date] [datetime2](7) NULL,
	[modified_by] [nvarchar](255) NULL,
	[modified_date] [datetime2](7) NULL,
	[finished] [int] NOT NULL,
	[lasttimeview] [int] NOT NULL,
	[id_chapter] [bigint] NULL,
	[id_user] [bigint] NULL,
	[id_video_lecture] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ward]    Script Date: 3/23/2020 10:06:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ward](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[id_provine] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[add_point]  WITH CHECK ADD  CONSTRAINT [FK1vsubfqvsh154e8cg9o9371iu] FOREIGN KEY([id_type_question])
REFERENCES [dbo].[type_question] ([id])
GO
ALTER TABLE [dbo].[add_point] CHECK CONSTRAINT [FK1vsubfqvsh154e8cg9o9371iu]
GO
ALTER TABLE [dbo].[add_point]  WITH CHECK ADD  CONSTRAINT [FKs4afg4obt48v4bnana8ijndat] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[add_point] CHECK CONSTRAINT [FKs4afg4obt48v4bnana8ijndat]
GO
ALTER TABLE [dbo].[answer]  WITH CHECK ADD  CONSTRAINT [FKco1pkchpedfpv4r4v3nkyxsx3] FOREIGN KEY([id_question])
REFERENCES [dbo].[question] ([id])
GO
ALTER TABLE [dbo].[answer] CHECK CONSTRAINT [FKco1pkchpedfpv4r4v3nkyxsx3]
GO
ALTER TABLE [dbo].[candidates]  WITH CHECK ADD  CONSTRAINT [FK2rlv09fhl1073rr7ryulhw0pc] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[candidates] CHECK CONSTRAINT [FK2rlv09fhl1073rr7ryulhw0pc]
GO
ALTER TABLE [dbo].[candidates]  WITH CHECK ADD  CONSTRAINT [FKkmb0c4th3o3wdmtqvl55n1avq] FOREIGN KEY([id_group_test])
REFERENCES [dbo].[group_test] ([id])
GO
ALTER TABLE [dbo].[candidates] CHECK CONSTRAINT [FKkmb0c4th3o3wdmtqvl55n1avq]
GO
ALTER TABLE [dbo].[candidates]  WITH CHECK ADD  CONSTRAINT [FKlfiknx2v16o7v7uyr6k4g4spo] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[candidates] CHECK CONSTRAINT [FKlfiknx2v16o7v7uyr6k4g4spo]
GO
ALTER TABLE [dbo].[certificatee]  WITH CHECK ADD  CONSTRAINT [FK12n5fywd1t9477mhqo2wcpyfn] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[certificatee] CHECK CONSTRAINT [FK12n5fywd1t9477mhqo2wcpyfn]
GO
ALTER TABLE [dbo].[certificatee]  WITH CHECK ADD  CONSTRAINT [FKr4pbj1xfrw8sckcjfc26uyerm] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[certificatee] CHECK CONSTRAINT [FKr4pbj1xfrw8sckcjfc26uyerm]
GO
ALTER TABLE [dbo].[chapter]  WITH CHECK ADD  CONSTRAINT [FKogm47m003ffemuspr6k8bv84e] FOREIGN KEY([id_outline])
REFERENCES [dbo].[outline] ([id])
GO
ALTER TABLE [dbo].[chapter] CHECK CONSTRAINT [FKogm47m003ffemuspr6k8bv84e]
GO
ALTER TABLE [dbo].[chapter_freedom_lecture]  WITH CHECK ADD  CONSTRAINT [FK8ypbr72949dxsox2yrt7hw6bo] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[chapter_freedom_lecture] CHECK CONSTRAINT [FK8ypbr72949dxsox2yrt7hw6bo]
GO
ALTER TABLE [dbo].[chapter_freedom_lecture]  WITH CHECK ADD  CONSTRAINT [FKi2srbj86607e64inambycqf7r] FOREIGN KEY([id_freedom_lecture])
REFERENCES [dbo].[freedom_lecture] ([id])
GO
ALTER TABLE [dbo].[chapter_freedom_lecture] CHECK CONSTRAINT [FKi2srbj86607e64inambycqf7r]
GO
ALTER TABLE [dbo].[chapter_home_work]  WITH CHECK ADD  CONSTRAINT [FKm8ti9133u93ytowdcarskv0ah] FOREIGN KEY([id_home_work])
REFERENCES [dbo].[home_work] ([id])
GO
ALTER TABLE [dbo].[chapter_home_work] CHECK CONSTRAINT [FKm8ti9133u93ytowdcarskv0ah]
GO
ALTER TABLE [dbo].[chapter_home_work]  WITH CHECK ADD  CONSTRAINT [FKpkk73q49fmrq7l6vclklgkxor] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[chapter_home_work] CHECK CONSTRAINT [FKpkk73q49fmrq7l6vclklgkxor]
GO
ALTER TABLE [dbo].[chapter_powerpointlecture]  WITH CHECK ADD  CONSTRAINT [FK2x9atujbvb8y2bktgw58gdfoh] FOREIGN KEY([id_powerpoint_lecture])
REFERENCES [dbo].[powerpoint_lecture] ([id])
GO
ALTER TABLE [dbo].[chapter_powerpointlecture] CHECK CONSTRAINT [FK2x9atujbvb8y2bktgw58gdfoh]
GO
ALTER TABLE [dbo].[chapter_powerpointlecture]  WITH CHECK ADD  CONSTRAINT [FKey3yhb06bnh94l91tvfwo32di] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[chapter_powerpointlecture] CHECK CONSTRAINT [FKey3yhb06bnh94l91tvfwo32di]
GO
ALTER TABLE [dbo].[chapter_scorm_lecture]  WITH CHECK ADD  CONSTRAINT [FKepc9mbyghnksr87rqxkxy0crk] FOREIGN KEY([id_scorm_lecture])
REFERENCES [dbo].[scorm_lecture] ([id])
GO
ALTER TABLE [dbo].[chapter_scorm_lecture] CHECK CONSTRAINT [FKepc9mbyghnksr87rqxkxy0crk]
GO
ALTER TABLE [dbo].[chapter_scorm_lecture]  WITH CHECK ADD  CONSTRAINT [FKm67wm3af8gm2x36hb0i2u6m6a] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[chapter_scorm_lecture] CHECK CONSTRAINT [FKm67wm3af8gm2x36hb0i2u6m6a]
GO
ALTER TABLE [dbo].[chapter_video_lecture]  WITH CHECK ADD  CONSTRAINT [FKgvwr7c1ltblwhv0ajb9npk39n] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[chapter_video_lecture] CHECK CONSTRAINT [FKgvwr7c1ltblwhv0ajb9npk39n]
GO
ALTER TABLE [dbo].[chapter_video_lecture]  WITH CHECK ADD  CONSTRAINT [FKs0n48a325o54oib7apndhhvxp] FOREIGN KEY([id_video_lecture])
REFERENCES [dbo].[video_lecture] ([id])
GO
ALTER TABLE [dbo].[chapter_video_lecture] CHECK CONSTRAINT [FKs0n48a325o54oib7apndhhvxp]
GO
ALTER TABLE [dbo].[comments]  WITH CHECK ADD  CONSTRAINT [FK2e1j871ildbkagpidsson8krk] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[comments] CHECK CONSTRAINT [FK2e1j871ildbkagpidsson8krk]
GO
ALTER TABLE [dbo].[comments]  WITH CHECK ADD  CONSTRAINT [FK88ss0ud6d1f9idypwpeuer772] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[comments] CHECK CONSTRAINT [FK88ss0ud6d1f9idypwpeuer772]
GO
ALTER TABLE [dbo].[commune_vnpost]  WITH CHECK ADD  CONSTRAINT [FKx778w5bfiih5texqjdpdne69] FOREIGN KEY([district_code])
REFERENCES [dbo].[district_vnpost] ([district_code])
GO
ALTER TABLE [dbo].[commune_vnpost] CHECK CONSTRAINT [FKx778w5bfiih5texqjdpdne69]
GO
ALTER TABLE [dbo].[competition]  WITH CHECK ADD  CONSTRAINT [FKdsciekpenai4luq5vfp6m2tlb] FOREIGN KEY([id_unit])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[competition] CHECK CONSTRAINT [FKdsciekpenai4luq5vfp6m2tlb]
GO
ALTER TABLE [dbo].[competition]  WITH CHECK ADD  CONSTRAINT [FKfbfnocpe5x96d79c5saorc36w] FOREIGN KEY([id_competition_category])
REFERENCES [dbo].[competition_category] ([id])
GO
ALTER TABLE [dbo].[competition] CHECK CONSTRAINT [FKfbfnocpe5x96d79c5saorc36w]
GO
ALTER TABLE [dbo].[config_report]  WITH CHECK ADD  CONSTRAINT [FKjteq1c4b85n06pakdmfinj7en] FOREIGN KEY([id_group_report])
REFERENCES [dbo].[group_report] ([id])
GO
ALTER TABLE [dbo].[config_report] CHECK CONSTRAINT [FKjteq1c4b85n06pakdmfinj7en]
GO
ALTER TABLE [dbo].[configurationn]  WITH CHECK ADD  CONSTRAINT [FKkqjwbaogyjql9tof1o5ymj6tg] FOREIGN KEY([id_type_data])
REFERENCES [dbo].[type_data] ([id])
GO
ALTER TABLE [dbo].[configurationn] CHECK CONSTRAINT [FKkqjwbaogyjql9tof1o5ymj6tg]
GO
ALTER TABLE [dbo].[course]  WITH CHECK ADD  CONSTRAINT [FKbkkamfydr2iyphmu6po9tqlof] FOREIGN KEY([id_course_category])
REFERENCES [dbo].[coursecategory] ([id])
GO
ALTER TABLE [dbo].[course] CHECK CONSTRAINT [FKbkkamfydr2iyphmu6po9tqlof]
GO
ALTER TABLE [dbo].[course]  WITH CHECK ADD  CONSTRAINT [FKdasyj4xscl19wxbewnqfr74o6] FOREIGN KEY([idposcode_vnpost])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[course] CHECK CONSTRAINT [FKdasyj4xscl19wxbewnqfr74o6]
GO
ALTER TABLE [dbo].[course_category_tree]  WITH CHECK ADD  CONSTRAINT [FK9ptv89eelkl95rgm4i8b5aps9] FOREIGN KEY([id_course_category_one])
REFERENCES [dbo].[coursecategory] ([id])
GO
ALTER TABLE [dbo].[course_category_tree] CHECK CONSTRAINT [FK9ptv89eelkl95rgm4i8b5aps9]
GO
ALTER TABLE [dbo].[course_category_tree]  WITH CHECK ADD  CONSTRAINT [FKrutyq1ae9vy3nfx06l2xdt1dk] FOREIGN KEY([id_course_catgeory_two])
REFERENCES [dbo].[coursecategory] ([id])
GO
ALTER TABLE [dbo].[course_category_tree] CHECK CONSTRAINT [FKrutyq1ae9vy3nfx06l2xdt1dk]
GO
ALTER TABLE [dbo].[course_config]  WITH CHECK ADD  CONSTRAINT [FK3f6cumqnkasuo2r0n83wwjlsx] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[course_config] CHECK CONSTRAINT [FK3f6cumqnkasuo2r0n83wwjlsx]
GO
ALTER TABLE [dbo].[course_course]  WITH CHECK ADD  CONSTRAINT [FK6wdxwna7rehxusxiu0jpg7qv3] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[course_course] CHECK CONSTRAINT [FK6wdxwna7rehxusxiu0jpg7qv3]
GO
ALTER TABLE [dbo].[course_course]  WITH CHECK ADD  CONSTRAINT [FKop0kju95b8a55cdr010iqk6h7] FOREIGN KEY([id_course2])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[course_course] CHECK CONSTRAINT [FKop0kju95b8a55cdr010iqk6h7]
GO
ALTER TABLE [dbo].[course_document]  WITH CHECK ADD  CONSTRAINT [FK2090qlcvoqgnpocdhlpt0h6x9] FOREIGN KEY([id_document])
REFERENCES [dbo].[document] ([id])
GO
ALTER TABLE [dbo].[course_document] CHECK CONSTRAINT [FK2090qlcvoqgnpocdhlpt0h6x9]
GO
ALTER TABLE [dbo].[course_document]  WITH CHECK ADD  CONSTRAINT [FKo4otgucvh1pe46kgfivrsp8j4] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[course_document] CHECK CONSTRAINT [FKo4otgucvh1pe46kgfivrsp8j4]
GO
ALTER TABLE [dbo].[course_join]  WITH CHECK ADD  CONSTRAINT [FK7mvsvk1tkewrq3ulxdqfhi40v] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[course_join] CHECK CONSTRAINT [FK7mvsvk1tkewrq3ulxdqfhi40v]
GO
ALTER TABLE [dbo].[course_join]  WITH CHECK ADD  CONSTRAINT [FKovhtocv7ae2tu8hqcsa5wyfpj] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[course_join] CHECK CONSTRAINT [FKovhtocv7ae2tu8hqcsa5wyfpj]
GO
ALTER TABLE [dbo].[course_requirement]  WITH CHECK ADD  CONSTRAINT [FKbd4b7vkeaew3tkixjlwi20ahh] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[course_requirement] CHECK CONSTRAINT [FKbd4b7vkeaew3tkixjlwi20ahh]
GO
ALTER TABLE [dbo].[course_requirement]  WITH CHECK ADD  CONSTRAINT [FKbdjee7pmpjf0nm797ua2r0ene] FOREIGN KEY([id_positionname])
REFERENCES [dbo].[position_name] ([id])
GO
ALTER TABLE [dbo].[course_requirement] CHECK CONSTRAINT [FKbdjee7pmpjf0nm797ua2r0ene]
GO
ALTER TABLE [dbo].[detail_permisstion]  WITH CHECK ADD  CONSTRAINT [FK4prjj2t4i34mvbr7bw4bknatm] FOREIGN KEY([id_permistion])
REFERENCES [dbo].[permistion] ([id])
GO
ALTER TABLE [dbo].[detail_permisstion] CHECK CONSTRAINT [FK4prjj2t4i34mvbr7bw4bknatm]
GO
ALTER TABLE [dbo].[district_vnpost]  WITH CHECK ADD  CONSTRAINT [FK5pyo4qo4dexofhxwo8qulnoyv] FOREIGN KEY([province_code])
REFERENCES [dbo].[province_vnpost] ([province_code])
GO
ALTER TABLE [dbo].[district_vnpost] CHECK CONSTRAINT [FK5pyo4qo4dexofhxwo8qulnoyv]
GO
ALTER TABLE [dbo].[document]  WITH CHECK ADD  CONSTRAINT [FKaja127de2yxbeomjxyynj330t] FOREIGN KEY([id_limit])
REFERENCES [dbo].[limit_document] ([id])
GO
ALTER TABLE [dbo].[document] CHECK CONSTRAINT [FKaja127de2yxbeomjxyynj330t]
GO
ALTER TABLE [dbo].[document]  WITH CHECK ADD  CONSTRAINT [FKe904tyc62jhp8d5xew9ew7agv] FOREIGN KEY([id_prioritize])
REFERENCES [dbo].[prioritize] ([id])
GO
ALTER TABLE [dbo].[document] CHECK CONSTRAINT [FKe904tyc62jhp8d5xew9ew7agv]
GO
ALTER TABLE [dbo].[document]  WITH CHECK ADD  CONSTRAINT [FKki7ptxeu77yklwx0igvgq5dw2] FOREIGN KEY([id_unit])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[document] CHECK CONSTRAINT [FKki7ptxeu77yklwx0igvgq5dw2]
GO
ALTER TABLE [dbo].[document]  WITH CHECK ADD  CONSTRAINT [FKnurot8ba2s2qiwu60rg7lchrf] FOREIGN KEY([id_document_category])
REFERENCES [dbo].[document_category] ([id])
GO
ALTER TABLE [dbo].[document] CHECK CONSTRAINT [FKnurot8ba2s2qiwu60rg7lchrf]
GO
ALTER TABLE [dbo].[eventt]  WITH CHECK ADD  CONSTRAINT [FK6m6ewa6rlif44o5sotisaov47] FOREIGN KEY([id_unit])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[eventt] CHECK CONSTRAINT [FK6m6ewa6rlif44o5sotisaov47]
GO
ALTER TABLE [dbo].[eventt]  WITH CHECK ADD  CONSTRAINT [FKa5x5oke19bjm2q98kqyyaav9f] FOREIGN KEY([id_detail_category_event])
REFERENCES [dbo].[detail_category_event] ([id])
GO
ALTER TABLE [dbo].[eventt] CHECK CONSTRAINT [FKa5x5oke19bjm2q98kqyyaav9f]
GO
ALTER TABLE [dbo].[eventt]  WITH CHECK ADD  CONSTRAINT [FKcr5478v5tlxcvng6nlfhv7rw6] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[eventt] CHECK CONSTRAINT [FKcr5478v5tlxcvng6nlfhv7rw6]
GO
ALTER TABLE [dbo].[formemail]  WITH CHECK ADD  CONSTRAINT [FKq2o8fgkono4681xeaeiktu0td] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[formemail] CHECK CONSTRAINT [FKq2o8fgkono4681xeaeiktu0td]
GO
ALTER TABLE [dbo].[freedom_lecture]  WITH CHECK ADD  CONSTRAINT [FK704bw3j0yess7q6ern273oba1] FOREIGN KEY([id_course_ware])
REFERENCES [dbo].[course_ware] ([id])
GO
ALTER TABLE [dbo].[freedom_lecture] CHECK CONSTRAINT [FK704bw3j0yess7q6ern273oba1]
GO
ALTER TABLE [dbo].[freedom_lecture_process]  WITH CHECK ADD  CONSTRAINT [FK3yfy1374lr0xavqsdtey5s4y7] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[freedom_lecture_process] CHECK CONSTRAINT [FK3yfy1374lr0xavqsdtey5s4y7]
GO
ALTER TABLE [dbo].[freedom_lecture_process]  WITH CHECK ADD  CONSTRAINT [FK4u19fmeipctexe00y11wl6as9] FOREIGN KEY([id_freedom_lecture])
REFERENCES [dbo].[freedom_lecture] ([id])
GO
ALTER TABLE [dbo].[freedom_lecture_process] CHECK CONSTRAINT [FK4u19fmeipctexe00y11wl6as9]
GO
ALTER TABLE [dbo].[freedom_lecture_process]  WITH CHECK ADD  CONSTRAINT [FK5bg3u4dvfqpo2qsnr4c87uqsj] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[freedom_lecture_process] CHECK CONSTRAINT [FK5bg3u4dvfqpo2qsnr4c87uqsj]
GO
ALTER TABLE [dbo].[group_test]  WITH CHECK ADD  CONSTRAINT [FK9c62dd2uc0eidswarsl91kmjl] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[group_test] CHECK CONSTRAINT [FK9c62dd2uc0eidswarsl91kmjl]
GO
ALTER TABLE [dbo].[groupposition]  WITH CHECK ADD  CONSTRAINT [FKj9qwfxctoahfsbvxo44b50e14] FOREIGN KEY([id_unit])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[groupposition] CHECK CONSTRAINT [FKj9qwfxctoahfsbvxo44b50e14]
GO
ALTER TABLE [dbo].[groups]  WITH CHECK ADD  CONSTRAINT [FK8h33agtnpat4tglgk9em9l9pd] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[groups] CHECK CONSTRAINT [FK8h33agtnpat4tglgk9em9l9pd]
GO
ALTER TABLE [dbo].[home_work]  WITH CHECK ADD  CONSTRAINT [FK75r8h59wta1cvuv28bg022gx0] FOREIGN KEY([id_course_ware])
REFERENCES [dbo].[course_ware] ([id])
GO
ALTER TABLE [dbo].[home_work] CHECK CONSTRAINT [FK75r8h59wta1cvuv28bg022gx0]
GO
ALTER TABLE [dbo].[home_work_answer]  WITH CHECK ADD  CONSTRAINT [FK90owahmdym03e1l23c3y8ea28] FOREIGN KEY([id_home_work_lecture_process])
REFERENCES [dbo].[home_work_lecture_process] ([id])
GO
ALTER TABLE [dbo].[home_work_answer] CHECK CONSTRAINT [FK90owahmdym03e1l23c3y8ea28]
GO
ALTER TABLE [dbo].[home_work_answer]  WITH CHECK ADD  CONSTRAINT [FKsctpthty0pt048oj32xykk9hx] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[home_work_answer] CHECK CONSTRAINT [FKsctpthty0pt048oj32xykk9hx]
GO
ALTER TABLE [dbo].[home_work_lecture_process]  WITH CHECK ADD  CONSTRAINT [FK7n4ei3l4jw6posrkmhkv5iqg] FOREIGN KEY([id_home_work])
REFERENCES [dbo].[home_work] ([id])
GO
ALTER TABLE [dbo].[home_work_lecture_process] CHECK CONSTRAINT [FK7n4ei3l4jw6posrkmhkv5iqg]
GO
ALTER TABLE [dbo].[home_work_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKm9jv7mbiswthjfin62l8py4ty] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[home_work_lecture_process] CHECK CONSTRAINT [FKm9jv7mbiswthjfin62l8py4ty]
GO
ALTER TABLE [dbo].[home_work_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKn3a3uo018v78y79p73m6a8gqr] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[home_work_lecture_process] CHECK CONSTRAINT [FKn3a3uo018v78y79p73m6a8gqr]
GO
ALTER TABLE [dbo].[inter_active_lecture]  WITH CHECK ADD  CONSTRAINT [FK2sk3hijd3vcrdjyso24m0v44r] FOREIGN KEY([id_course_ware])
REFERENCES [dbo].[course_ware] ([id])
GO
ALTER TABLE [dbo].[inter_active_lecture] CHECK CONSTRAINT [FK2sk3hijd3vcrdjyso24m0v44r]
GO
ALTER TABLE [dbo].[inter_active_lecture_chapter]  WITH CHECK ADD  CONSTRAINT [FKhajyq2xb74kh2tch8an0o0m9u] FOREIGN KEY([id_inter_active_lecture])
REFERENCES [dbo].[inter_active_lecture] ([id])
GO
ALTER TABLE [dbo].[inter_active_lecture_chapter] CHECK CONSTRAINT [FKhajyq2xb74kh2tch8an0o0m9u]
GO
ALTER TABLE [dbo].[inter_active_lecture_chapter]  WITH CHECK ADD  CONSTRAINT [FKt365vwnj5ko84ifr1amoxdc5u] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[inter_active_lecture_chapter] CHECK CONSTRAINT [FKt365vwnj5ko84ifr1amoxdc5u]
GO
ALTER TABLE [dbo].[inter_active_lectureprocess]  WITH CHECK ADD  CONSTRAINT [FKg0fkv2pe1g585j0510bb4r75g] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[inter_active_lectureprocess] CHECK CONSTRAINT [FKg0fkv2pe1g585j0510bb4r75g]
GO
ALTER TABLE [dbo].[inter_active_lectureprocess]  WITH CHECK ADD  CONSTRAINT [FKkk65pr43s06vgubl3sje7i0kt] FOREIGN KEY([id_inter_active_lecture])
REFERENCES [dbo].[inter_active_lecture] ([id])
GO
ALTER TABLE [dbo].[inter_active_lectureprocess] CHECK CONSTRAINT [FKkk65pr43s06vgubl3sje7i0kt]
GO
ALTER TABLE [dbo].[inter_active_lectureprocess]  WITH CHECK ADD  CONSTRAINT [FKn4nu6r4i7a9q7byr9q3ibmb6m] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[inter_active_lectureprocess] CHECK CONSTRAINT [FKn4nu6r4i7a9q7byr9q3ibmb6m]
GO
ALTER TABLE [dbo].[kind_position_name]  WITH CHECK ADD  CONSTRAINT [FK8xtnr2x9dh7535ls02qncctl6] FOREIGN KEY([id_groupposition])
REFERENCES [dbo].[groupposition] ([id])
GO
ALTER TABLE [dbo].[kind_position_name] CHECK CONSTRAINT [FK8xtnr2x9dh7535ls02qncctl6]
GO
ALTER TABLE [dbo].[news]  WITH CHECK ADD  CONSTRAINT [FKew9lq7fm4j3o4agugv828eehl] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[news] CHECK CONSTRAINT [FKew9lq7fm4j3o4agugv828eehl]
GO
ALTER TABLE [dbo].[news]  WITH CHECK ADD  CONSTRAINT [FKikmdi1immroxiuvrjghu27613] FOREIGN KEY([id_detail_category])
REFERENCES [dbo].[new_category] ([id])
GO
ALTER TABLE [dbo].[news] CHECK CONSTRAINT [FKikmdi1immroxiuvrjghu27613]
GO
ALTER TABLE [dbo].[news]  WITH CHECK ADD  CONSTRAINT [FKqtry16bndl4mpyv9ubw6y7n0h] FOREIGN KEY([id_unit])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[news] CHECK CONSTRAINT [FKqtry16bndl4mpyv9ubw6y7n0h]
GO
ALTER TABLE [dbo].[outline]  WITH CHECK ADD  CONSTRAINT [FKb2umr0wutgmonmrn68mj5hcmo] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[outline] CHECK CONSTRAINT [FKb2umr0wutgmonmrn68mj5hcmo]
GO
ALTER TABLE [dbo].[poscode_vnpost]  WITH CHECK ADD  CONSTRAINT [FK4c5oe9i7w8pq241fgw6u28x72] FOREIGN KEY([commune_code])
REFERENCES [dbo].[commune_vnpost] ([commune_code])
GO
ALTER TABLE [dbo].[poscode_vnpost] CHECK CONSTRAINT [FK4c5oe9i7w8pq241fgw6u28x72]
GO
ALTER TABLE [dbo].[poscode_vnpost]  WITH CHECK ADD  CONSTRAINT [FKlge0anl2vfcibto4sw4406lfx] FOREIGN KEY([unit_code])
REFERENCES [dbo].[unit_vnpost] ([unit_code])
GO
ALTER TABLE [dbo].[poscode_vnpost] CHECK CONSTRAINT [FKlge0anl2vfcibto4sw4406lfx]
GO
ALTER TABLE [dbo].[poscode_vnpost_course]  WITH CHECK ADD  CONSTRAINT [FKfmi9j6jgqejpiu70iiamc6qug] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[poscode_vnpost_course] CHECK CONSTRAINT [FKfmi9j6jgqejpiu70iiamc6qug]
GO
ALTER TABLE [dbo].[poscode_vnpost_course]  WITH CHECK ADD  CONSTRAINT [FKhwfy9lqkmvi9rda2iutesnpwc] FOREIGN KEY([id_poscode_vnpost])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[poscode_vnpost_course] CHECK CONSTRAINT [FKhwfy9lqkmvi9rda2iutesnpwc]
GO
ALTER TABLE [dbo].[position_name]  WITH CHECK ADD  CONSTRAINT [FKm40fg3kb8w6e67u53s3ht3gh4] FOREIGN KEY([id_racing])
REFERENCES [dbo].[racing_position_name] ([id])
GO
ALTER TABLE [dbo].[position_name] CHECK CONSTRAINT [FKm40fg3kb8w6e67u53s3ht3gh4]
GO
ALTER TABLE [dbo].[position_name]  WITH CHECK ADD  CONSTRAINT [FKqoxas4mw42r0mu3au57kl7hid] FOREIGN KEY([id_kind_position])
REFERENCES [dbo].[kind_position_name] ([id])
GO
ALTER TABLE [dbo].[position_name] CHECK CONSTRAINT [FKqoxas4mw42r0mu3au57kl7hid]
GO
ALTER TABLE [dbo].[powerpoint_lecture]  WITH CHECK ADD  CONSTRAINT [FKrh0thnorl7wruydbsgdu8uiig] FOREIGN KEY([id_course_ware])
REFERENCES [dbo].[course_ware] ([id])
GO
ALTER TABLE [dbo].[powerpoint_lecture] CHECK CONSTRAINT [FKrh0thnorl7wruydbsgdu8uiig]
GO
ALTER TABLE [dbo].[powerpoint_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKbwr4iywd78cqck8ilksvxismd] FOREIGN KEY([id_powerpoint_lecture])
REFERENCES [dbo].[powerpoint_lecture] ([id])
GO
ALTER TABLE [dbo].[powerpoint_lecture_process] CHECK CONSTRAINT [FKbwr4iywd78cqck8ilksvxismd]
GO
ALTER TABLE [dbo].[powerpoint_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKdbd7jj0p66s643qi7b0lt122g] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[powerpoint_lecture_process] CHECK CONSTRAINT [FKdbd7jj0p66s643qi7b0lt122g]
GO
ALTER TABLE [dbo].[powerpoint_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKim71l4vrj161i7j0edn6s0clx] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[powerpoint_lecture_process] CHECK CONSTRAINT [FKim71l4vrj161i7j0edn6s0clx]
GO
ALTER TABLE [dbo].[provine]  WITH CHECK ADD  CONSTRAINT [FKaoh95ojfpdyoka35jlh0ne8fq] FOREIGN KEY([id_district])
REFERENCES [dbo].[district] ([id])
GO
ALTER TABLE [dbo].[provine] CHECK CONSTRAINT [FKaoh95ojfpdyoka35jlh0ne8fq]
GO
ALTER TABLE [dbo].[question]  WITH CHECK ADD  CONSTRAINT [FK7r23cacgroqm71nllk1jx6dli] FOREIGN KEY([id_question_category])
REFERENCES [dbo].[question_category] ([id])
GO
ALTER TABLE [dbo].[question] CHECK CONSTRAINT [FK7r23cacgroqm71nllk1jx6dli]
GO
ALTER TABLE [dbo].[question]  WITH CHECK ADD  CONSTRAINT [FKai9o3kn6e6mgjl425nkw31fcs] FOREIGN KEY([id_level])
REFERENCES [dbo].[levell] ([id])
GO
ALTER TABLE [dbo].[question] CHECK CONSTRAINT [FKai9o3kn6e6mgjl425nkw31fcs]
GO
ALTER TABLE [dbo].[question]  WITH CHECK ADD  CONSTRAINT [FKjf9jc8brn5ycb55qe9je9okht] FOREIGN KEY([id_tag])
REFERENCES [dbo].[tags] ([id])
GO
ALTER TABLE [dbo].[question] CHECK CONSTRAINT [FKjf9jc8brn5ycb55qe9je9okht]
GO
ALTER TABLE [dbo].[question]  WITH CHECK ADD  CONSTRAINT [FKpc3tjvlg7veb4fihlfs8nuw1t] FOREIGN KEY([id_type_question])
REFERENCES [dbo].[type_question] ([id])
GO
ALTER TABLE [dbo].[question] CHECK CONSTRAINT [FKpc3tjvlg7veb4fihlfs8nuw1t]
GO
ALTER TABLE [dbo].[question_category]  WITH CHECK ADD  CONSTRAINT [FKhgtft4nwf1h1a229ewruuso7] FOREIGN KEY([id_unit])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[question_category] CHECK CONSTRAINT [FKhgtft4nwf1h1a229ewruuso7]
GO
ALTER TABLE [dbo].[question_round_test]  WITH CHECK ADD  CONSTRAINT [FK5li2pgs6ntt9kraabtroqmbf5] FOREIGN KEY([id_question])
REFERENCES [dbo].[question] ([id])
GO
ALTER TABLE [dbo].[question_round_test] CHECK CONSTRAINT [FK5li2pgs6ntt9kraabtroqmbf5]
GO
ALTER TABLE [dbo].[question_round_test]  WITH CHECK ADD  CONSTRAINT [FK8bml2xpxnnja65jr7bi6rb6vl] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[question_round_test] CHECK CONSTRAINT [FK8bml2xpxnnja65jr7bi6rb6vl]
GO
ALTER TABLE [dbo].[question_test]  WITH CHECK ADD  CONSTRAINT [FKi2oi5gcev1yjaqvfsb3xgd17] FOREIGN KEY([id_test])
REFERENCES [dbo].[test] ([id])
GO
ALTER TABLE [dbo].[question_test] CHECK CONSTRAINT [FKi2oi5gcev1yjaqvfsb3xgd17]
GO
ALTER TABLE [dbo].[question_test]  WITH CHECK ADD  CONSTRAINT [FKm5uys0rsbd42dgp0otmv47x0p] FOREIGN KEY([id_question])
REFERENCES [dbo].[question] ([id])
GO
ALTER TABLE [dbo].[question_test] CHECK CONSTRAINT [FKm5uys0rsbd42dgp0otmv47x0p]
GO
ALTER TABLE [dbo].[rate]  WITH CHECK ADD  CONSTRAINT [FKavl2th8tlcnqihw5q0pt7o86f] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[rate] CHECK CONSTRAINT [FKavl2th8tlcnqihw5q0pt7o86f]
GO
ALTER TABLE [dbo].[rate]  WITH CHECK ADD  CONSTRAINT [FKjpl4rcgr92ouygh9iyj0slk1i] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[rate] CHECK CONSTRAINT [FKjpl4rcgr92ouygh9iyj0slk1i]
GO
ALTER TABLE [dbo].[requirement_test]  WITH CHECK ADD  CONSTRAINT [FK8wqu5242xyohkd8xafccyud4p] FOREIGN KEY([id_positionname])
REFERENCES [dbo].[position_name] ([id])
GO
ALTER TABLE [dbo].[requirement_test] CHECK CONSTRAINT [FK8wqu5242xyohkd8xafccyud4p]
GO
ALTER TABLE [dbo].[requirement_test]  WITH CHECK ADD  CONSTRAINT [FKnl9h0vlok04om3b8h55xc4atu] FOREIGN KEY([id_competition])
REFERENCES [dbo].[competition] ([id])
GO
ALTER TABLE [dbo].[requirement_test] CHECK CONSTRAINT [FKnl9h0vlok04om3b8h55xc4atu]
GO
ALTER TABLE [dbo].[result]  WITH CHECK ADD  CONSTRAINT [FK276w3172ssucuevwfe4v8tl60] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[result] CHECK CONSTRAINT [FK276w3172ssucuevwfe4v8tl60]
GO
ALTER TABLE [dbo].[result]  WITH CHECK ADD  CONSTRAINT [FK9908p7dxx9qt9bfwu9wqoapfq] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[result] CHECK CONSTRAINT [FK9908p7dxx9qt9bfwu9wqoapfq]
GO
ALTER TABLE [dbo].[result]  WITH CHECK ADD  CONSTRAINT [FKtew87nfl0iglttox9aoanutnd] FOREIGN KEY([id_question])
REFERENCES [dbo].[question] ([id])
GO
ALTER TABLE [dbo].[result] CHECK CONSTRAINT [FKtew87nfl0iglttox9aoanutnd]
GO
ALTER TABLE [dbo].[role_course_action]  WITH CHECK ADD  CONSTRAINT [FKmy7092ott7qyh6phm4lmbrb80] FOREIGN KEY([id_course_role])
REFERENCES [dbo].[course_role] ([id])
GO
ALTER TABLE [dbo].[role_course_action] CHECK CONSTRAINT [FKmy7092ott7qyh6phm4lmbrb80]
GO
ALTER TABLE [dbo].[round_test]  WITH CHECK ADD  CONSTRAINT [FK8ism47pytcke5dp1h65irhokt] FOREIGN KEY([id_condition])
REFERENCES [dbo].[condition] ([id])
GO
ALTER TABLE [dbo].[round_test] CHECK CONSTRAINT [FK8ism47pytcke5dp1h65irhokt]
GO
ALTER TABLE [dbo].[round_test]  WITH CHECK ADD  CONSTRAINT [FKbjo4v28km9sp2aq64qc736lvd] FOREIGN KEY([id_competition])
REFERENCES [dbo].[competition] ([id])
GO
ALTER TABLE [dbo].[round_test] CHECK CONSTRAINT [FKbjo4v28km9sp2aq64qc736lvd]
GO
ALTER TABLE [dbo].[round_test]  WITH CHECK ADD  CONSTRAINT [FKc5mplt1duhqd6f4iotqdtrcp1] FOREIGN KEY([id_mix_compettion])
REFERENCES [dbo].[mix_competition] ([id])
GO
ALTER TABLE [dbo].[round_test] CHECK CONSTRAINT [FKc5mplt1duhqd6f4iotqdtrcp1]
GO
ALTER TABLE [dbo].[round_test]  WITH CHECK ADD  CONSTRAINT [FKg5j1lkg72yt1kijq515c50llq] FOREIGN KEY([id_struct_test])
REFERENCES [dbo].[struct_test] ([id])
GO
ALTER TABLE [dbo].[round_test] CHECK CONSTRAINT [FKg5j1lkg72yt1kijq515c50llq]
GO
ALTER TABLE [dbo].[scorm_lecture]  WITH CHECK ADD  CONSTRAINT [FK20me4qmf6c1v671mp488vxn41] FOREIGN KEY([id_course_ware])
REFERENCES [dbo].[course_ware] ([id])
GO
ALTER TABLE [dbo].[scorm_lecture] CHECK CONSTRAINT [FK20me4qmf6c1v671mp488vxn41]
GO
ALTER TABLE [dbo].[scorm_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKefteqijgty0rbu98emxndxe12] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[scorm_lecture_process] CHECK CONSTRAINT [FKefteqijgty0rbu98emxndxe12]
GO
ALTER TABLE [dbo].[scorm_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKicdmrf2vbij99f8gp43vldg35] FOREIGN KEY([id_scorm_lecture])
REFERENCES [dbo].[scorm_lecture] ([id])
GO
ALTER TABLE [dbo].[scorm_lecture_process] CHECK CONSTRAINT [FKicdmrf2vbij99f8gp43vldg35]
GO
ALTER TABLE [dbo].[scorm_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKpoyphp46imbbrrq6oxme38k4s] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[scorm_lecture_process] CHECK CONSTRAINT [FKpoyphp46imbbrrq6oxme38k4s]
GO
ALTER TABLE [dbo].[source_question]  WITH CHECK ADD  CONSTRAINT [FK8mb0ae9kdavot97k10o4wmos1] FOREIGN KEY([id_test_kit])
REFERENCES [dbo].[test_kit] ([id])
GO
ALTER TABLE [dbo].[source_question] CHECK CONSTRAINT [FK8mb0ae9kdavot97k10o4wmos1]
GO
ALTER TABLE [dbo].[source_question]  WITH CHECK ADD  CONSTRAINT [FKsrnrlg4rku9wqvr0r6sj3ym64] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[source_question] CHECK CONSTRAINT [FKsrnrlg4rku9wqvr0r6sj3ym64]
GO
ALTER TABLE [dbo].[statistical_action]  WITH CHECK ADD  CONSTRAINT [FK3g6xovi8dpkedvarh5u8nnckm] FOREIGN KEY([id_method])
REFERENCES [dbo].[method] ([id])
GO
ALTER TABLE [dbo].[statistical_action] CHECK CONSTRAINT [FK3g6xovi8dpkedvarh5u8nnckm]
GO
ALTER TABLE [dbo].[statistical_action]  WITH CHECK ADD  CONSTRAINT [FKsk3ne5rkp3hbxak3sc1oeuied] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[statistical_action] CHECK CONSTRAINT [FKsk3ne5rkp3hbxak3sc1oeuied]
GO
ALTER TABLE [dbo].[statistical_round_test]  WITH CHECK ADD  CONSTRAINT [FK2epce0hg142jhe9mjfofsifbc] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[statistical_round_test] CHECK CONSTRAINT [FK2epce0hg142jhe9mjfofsifbc]
GO
ALTER TABLE [dbo].[statistical_round_test]  WITH CHECK ADD  CONSTRAINT [FKc00v1cj54pfpg7gpwnspt0168] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[statistical_round_test] CHECK CONSTRAINT [FKc00v1cj54pfpg7gpwnspt0168]
GO
ALTER TABLE [dbo].[struct_test]  WITH CHECK ADD  CONSTRAINT [FK7gyl8pinr4d1wwu377m40vh2q] FOREIGN KEY([id_tag])
REFERENCES [dbo].[tags] ([id])
GO
ALTER TABLE [dbo].[struct_test] CHECK CONSTRAINT [FK7gyl8pinr4d1wwu377m40vh2q]
GO
ALTER TABLE [dbo].[struct_test]  WITH CHECK ADD  CONSTRAINT [FKdnbkjpw0vjsaktgjr1vqoh1h6] FOREIGN KEY([id_level])
REFERENCES [dbo].[levell] ([id])
GO
ALTER TABLE [dbo].[struct_test] CHECK CONSTRAINT [FKdnbkjpw0vjsaktgjr1vqoh1h6]
GO
ALTER TABLE [dbo].[struct_test]  WITH CHECK ADD  CONSTRAINT [FKfvoublsk8c7osl640hdgq5esx] FOREIGN KEY([id_type_question])
REFERENCES [dbo].[type_question] ([id])
GO
ALTER TABLE [dbo].[struct_test] CHECK CONSTRAINT [FKfvoublsk8c7osl640hdgq5esx]
GO
ALTER TABLE [dbo].[struct_test]  WITH CHECK ADD  CONSTRAINT [FKoftdwuu9bowq5g626vf89mhdj] FOREIGN KEY([id_unit])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[struct_test] CHECK CONSTRAINT [FKoftdwuu9bowq5g626vf89mhdj]
GO
ALTER TABLE [dbo].[sub_point]  WITH CHECK ADD  CONSTRAINT [FKpjvcgsuvgj2ace28rvdluwtu7] FOREIGN KEY([id_round_test])
REFERENCES [dbo].[round_test] ([id])
GO
ALTER TABLE [dbo].[sub_point] CHECK CONSTRAINT [FKpjvcgsuvgj2ace28rvdluwtu7]
GO
ALTER TABLE [dbo].[sub_point]  WITH CHECK ADD  CONSTRAINT [FKrfnt0v60n7bq9e0b3nv6obve6] FOREIGN KEY([id_type_question])
REFERENCES [dbo].[type_question] ([id])
GO
ALTER TABLE [dbo].[sub_point] CHECK CONSTRAINT [FKrfnt0v60n7bq9e0b3nv6obve6]
GO
ALTER TABLE [dbo].[subjects]  WITH CHECK ADD  CONSTRAINT [FKt0e94byblx5f17b0kj2do4rrr] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[subjects] CHECK CONSTRAINT [FKt0e94byblx5f17b0kj2do4rrr]
GO
ALTER TABLE [dbo].[test]  WITH CHECK ADD  CONSTRAINT [FKch1tof4r45h3svmpc1fp06nua] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[test] CHECK CONSTRAINT [FKch1tof4r45h3svmpc1fp06nua]
GO
ALTER TABLE [dbo].[test]  WITH CHECK ADD  CONSTRAINT [FKt2f8i1dad84xctlp4rr9pycxl] FOREIGN KEY([id_test_kit])
REFERENCES [dbo].[test_kit] ([id])
GO
ALTER TABLE [dbo].[test] CHECK CONSTRAINT [FKt2f8i1dad84xctlp4rr9pycxl]
GO
ALTER TABLE [dbo].[test]  WITH CHECK ADD  CONSTRAINT [FKtfkpgdiv2v4eg7oeyu3pv9fbr] FOREIGN KEY([id_struct_test])
REFERENCES [dbo].[struct_test] ([id])
GO
ALTER TABLE [dbo].[test] CHECK CONSTRAINT [FKtfkpgdiv2v4eg7oeyu3pv9fbr]
GO
ALTER TABLE [dbo].[tree_category]  WITH CHECK ADD  CONSTRAINT [FKbow96vudni03vt21p6xhwqyw5] FOREIGN KEY([id_detail_category_one])
REFERENCES [dbo].[new_category] ([id])
GO
ALTER TABLE [dbo].[tree_category] CHECK CONSTRAINT [FKbow96vudni03vt21p6xhwqyw5]
GO
ALTER TABLE [dbo].[tree_category]  WITH CHECK ADD  CONSTRAINT [FKr0u8yja2qcjgm5jp9cu9ydyfk] FOREIGN KEY([id_detail_category_two])
REFERENCES [dbo].[new_category] ([id])
GO
ALTER TABLE [dbo].[tree_category] CHECK CONSTRAINT [FKr0u8yja2qcjgm5jp9cu9ydyfk]
GO
ALTER TABLE [dbo].[tree_competition]  WITH CHECK ADD  CONSTRAINT [FK3t6fhbmkoxgx5eol2cx8cukb5] FOREIGN KEY([id_competition_category_two])
REFERENCES [dbo].[competition_category] ([id])
GO
ALTER TABLE [dbo].[tree_competition] CHECK CONSTRAINT [FK3t6fhbmkoxgx5eol2cx8cukb5]
GO
ALTER TABLE [dbo].[tree_competition]  WITH CHECK ADD  CONSTRAINT [FKd3s6w9desdhh4l2nr08t6rkbu] FOREIGN KEY([id_competition_category_one])
REFERENCES [dbo].[competition_category] ([id])
GO
ALTER TABLE [dbo].[tree_competition] CHECK CONSTRAINT [FKd3s6w9desdhh4l2nr08t6rkbu]
GO
ALTER TABLE [dbo].[tree_document]  WITH CHECK ADD  CONSTRAINT [FKr3xkfr8os28ixxmku6i9lp4xk] FOREIGN KEY([id_document_category_two])
REFERENCES [dbo].[document_category] ([id])
GO
ALTER TABLE [dbo].[tree_document] CHECK CONSTRAINT [FKr3xkfr8os28ixxmku6i9lp4xk]
GO
ALTER TABLE [dbo].[tree_document]  WITH CHECK ADD  CONSTRAINT [FKsukd33b9nal1gj39uoj2pn4q1] FOREIGN KEY([id_document_category_one])
REFERENCES [dbo].[document_category] ([id])
GO
ALTER TABLE [dbo].[tree_document] CHECK CONSTRAINT [FKsukd33b9nal1gj39uoj2pn4q1]
GO
ALTER TABLE [dbo].[tree_event]  WITH CHECK ADD  CONSTRAINT [FK9en1lpqpgikewn5kl6aucdm4a] FOREIGN KEY([id_detail_category_event_two])
REFERENCES [dbo].[detail_category_event] ([id])
GO
ALTER TABLE [dbo].[tree_event] CHECK CONSTRAINT [FK9en1lpqpgikewn5kl6aucdm4a]
GO
ALTER TABLE [dbo].[tree_event]  WITH CHECK ADD  CONSTRAINT [FKhih3ggh6ocpyoo95lv0wfqi2w] FOREIGN KEY([id_detail_category_event_one])
REFERENCES [dbo].[detail_category_event] ([id])
GO
ALTER TABLE [dbo].[tree_event] CHECK CONSTRAINT [FKhih3ggh6ocpyoo95lv0wfqi2w]
GO
ALTER TABLE [dbo].[tree_permistion]  WITH CHECK ADD  CONSTRAINT [FKg6vhwa1qus2p3c4lvbadysojo] FOREIGN KEY([id_permistion_one])
REFERENCES [dbo].[permistion] ([id])
GO
ALTER TABLE [dbo].[tree_permistion] CHECK CONSTRAINT [FKg6vhwa1qus2p3c4lvbadysojo]
GO
ALTER TABLE [dbo].[tree_permistion]  WITH CHECK ADD  CONSTRAINT [FKmqpnqwohol4piexnpj7f9keju] FOREIGN KEY([id_permistion_two])
REFERENCES [dbo].[permistion] ([id])
GO
ALTER TABLE [dbo].[tree_permistion] CHECK CONSTRAINT [FKmqpnqwohol4piexnpj7f9keju]
GO
ALTER TABLE [dbo].[tree_postion]  WITH CHECK ADD  CONSTRAINT [FK2t15pseognnpl1oxcw81oudu4] FOREIGN KEY([id_routeposition])
REFERENCES [dbo].[routeposition] ([id])
GO
ALTER TABLE [dbo].[tree_postion] CHECK CONSTRAINT [FK2t15pseognnpl1oxcw81oudu4]
GO
ALTER TABLE [dbo].[tree_postion]  WITH CHECK ADD  CONSTRAINT [FK6jfplqsmfjm1xff572lkf3jtk] FOREIGN KEY([id_positionname])
REFERENCES [dbo].[position_name] ([id])
GO
ALTER TABLE [dbo].[tree_postion] CHECK CONSTRAINT [FK6jfplqsmfjm1xff572lkf3jtk]
GO
ALTER TABLE [dbo].[tree_question]  WITH CHECK ADD  CONSTRAINT [FKjacg46umei7iycihkbe2gq4de] FOREIGN KEY([id_question_category_two])
REFERENCES [dbo].[question_category] ([id])
GO
ALTER TABLE [dbo].[tree_question] CHECK CONSTRAINT [FKjacg46umei7iycihkbe2gq4de]
GO
ALTER TABLE [dbo].[tree_question]  WITH CHECK ADD  CONSTRAINT [FKs2h03nxaab5or2uroclcnkibr] FOREIGN KEY([id_question_category_one])
REFERENCES [dbo].[question_category] ([id])
GO
ALTER TABLE [dbo].[tree_question] CHECK CONSTRAINT [FKs2h03nxaab5or2uroclcnkibr]
GO
ALTER TABLE [dbo].[tree_test_kit]  WITH CHECK ADD  CONSTRAINT [FKcolmapvpauj1fb3xacvpg970e] FOREIGN KEY([id_test_kid_one])
REFERENCES [dbo].[test_kit] ([id])
GO
ALTER TABLE [dbo].[tree_test_kit] CHECK CONSTRAINT [FKcolmapvpauj1fb3xacvpg970e]
GO
ALTER TABLE [dbo].[tree_test_kit]  WITH CHECK ADD  CONSTRAINT [FKq59hjk0dtdrdu205v2bhmt9ab] FOREIGN KEY([id_test_kid_two])
REFERENCES [dbo].[test_kit] ([id])
GO
ALTER TABLE [dbo].[tree_test_kit] CHECK CONSTRAINT [FKq59hjk0dtdrdu205v2bhmt9ab]
GO
ALTER TABLE [dbo].[unit_vnpost]  WITH CHECK ADD  CONSTRAINT [FK1027x2ttlm0mpecheyu4ottxi] FOREIGN KEY([commune_code])
REFERENCES [dbo].[commune_vnpost] ([commune_code])
GO
ALTER TABLE [dbo].[unit_vnpost] CHECK CONSTRAINT [FK1027x2ttlm0mpecheyu4ottxi]
GO
ALTER TABLE [dbo].[user_course_group]  WITH CHECK ADD  CONSTRAINT [FKiqtcwfs0o6wivk3gkfwb4gadh] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[user_course_group] CHECK CONSTRAINT [FKiqtcwfs0o6wivk3gkfwb4gadh]
GO
ALTER TABLE [dbo].[user_course_group]  WITH CHECK ADD  CONSTRAINT [FKjn2oia7hqvvonwx1byqjnq23] FOREIGN KEY([id_group])
REFERENCES [dbo].[groups] ([id])
GO
ALTER TABLE [dbo].[user_course_group] CHECK CONSTRAINT [FKjn2oia7hqvvonwx1byqjnq23]
GO
ALTER TABLE [dbo].[user_permistion]  WITH CHECK ADD  CONSTRAINT [FKhk6sbsb4lhvxyrwn3fq5movgn] FOREIGN KEY([id_permistion])
REFERENCES [dbo].[permistion] ([id])
GO
ALTER TABLE [dbo].[user_permistion] CHECK CONSTRAINT [FKhk6sbsb4lhvxyrwn3fq5movgn]
GO
ALTER TABLE [dbo].[user_permistion]  WITH CHECK ADD  CONSTRAINT [FKiq316i22jj5ydpgcovwkmxixi] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[user_permistion] CHECK CONSTRAINT [FKiq316i22jj5ydpgcovwkmxixi]
GO
ALTER TABLE [dbo].[user_role_course]  WITH CHECK ADD  CONSTRAINT [FK1e0qjbhs3fh7noxjpd19wtsh5] FOREIGN KEY([id_course])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[user_role_course] CHECK CONSTRAINT [FK1e0qjbhs3fh7noxjpd19wtsh5]
GO
ALTER TABLE [dbo].[user_role_course]  WITH CHECK ADD  CONSTRAINT [FKddtg96jpnkl5cj22lx57pvo2r] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[user_role_course] CHECK CONSTRAINT [FKddtg96jpnkl5cj22lx57pvo2r]
GO
ALTER TABLE [dbo].[user_role_course]  WITH CHECK ADD  CONSTRAINT [FKrg5qlgjcvpat85qh2qek6etym] FOREIGN KEY([id_course_role])
REFERENCES [dbo].[course_role] ([id])
GO
ALTER TABLE [dbo].[user_role_course] CHECK CONSTRAINT [FKrg5qlgjcvpat85qh2qek6etym]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FKhwad1s4p38v7uxo49fjnan4f5] FOREIGN KEY([id_ward])
REFERENCES [dbo].[ward] ([id])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FKhwad1s4p38v7uxo49fjnan4f5]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FKlhsx160kd5l3s0xtn6dc7wjth] FOREIGN KEY([id_unit])
REFERENCES [dbo].[poscode_vnpost] ([poscode])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FKlhsx160kd5l3s0xtn6dc7wjth]
GO
ALTER TABLE [dbo].[video_lecture]  WITH CHECK ADD  CONSTRAINT [FK6wj29v95csp4ap47755vj9nb9] FOREIGN KEY([id_course_ware])
REFERENCES [dbo].[course_ware] ([id])
GO
ALTER TABLE [dbo].[video_lecture] CHECK CONSTRAINT [FK6wj29v95csp4ap47755vj9nb9]
GO
ALTER TABLE [dbo].[video_lecture_process]  WITH CHECK ADD  CONSTRAINT [FK34ky6pdb8lro5pqix0mk0h4jc] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[video_lecture_process] CHECK CONSTRAINT [FK34ky6pdb8lro5pqix0mk0h4jc]
GO
ALTER TABLE [dbo].[video_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKf26lii0t6hj79x6su5a8ai7o8] FOREIGN KEY([id_video_lecture])
REFERENCES [dbo].[video_lecture] ([id])
GO
ALTER TABLE [dbo].[video_lecture_process] CHECK CONSTRAINT [FKf26lii0t6hj79x6su5a8ai7o8]
GO
ALTER TABLE [dbo].[video_lecture_process]  WITH CHECK ADD  CONSTRAINT [FKiht2nhvjyqq5i5sb3k5p9bm48] FOREIGN KEY([id_chapter])
REFERENCES [dbo].[chapter] ([id])
GO
ALTER TABLE [dbo].[video_lecture_process] CHECK CONSTRAINT [FKiht2nhvjyqq5i5sb3k5p9bm48]
GO
ALTER TABLE [dbo].[ward]  WITH CHECK ADD  CONSTRAINT [FK6k9qy5g5dwxw1r46khsruryav] FOREIGN KEY([id_provine])
REFERENCES [dbo].[provine] ([id])
GO
ALTER TABLE [dbo].[ward] CHECK CONSTRAINT [FK6k9qy5g5dwxw1r46khsruryav]
GO
USE [master]
GO
ALTER DATABASE [E_learning] SET  READ_WRITE 
GO
