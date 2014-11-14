--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.5
-- Dumped by pg_dump version 9.3.5
-- Started on 2014-10-24 23:09:25 AST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 180 (class 3079 OID 12018)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2259 (class 0 OID 0)
-- Dependencies: 180
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 173 (class 1259 OID 24834)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE category (
    categoryid integer NOT NULL,
    categoryname character varying
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 172 (class 1259 OID 24832)
-- Name: category_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE category_categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_categoryid_seq OWNER TO postgres;

--
-- TOC entry 2260 (class 0 OID 0)
-- Dependencies: 172
-- Name: category_categoryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE category_categoryid_seq OWNED BY category.categoryid;


--
-- TOC entry 177 (class 1259 OID 24866)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE comment (
    commentid integer NOT NULL,
    userid bigint,
    itemid bigint,
    usercomment character(200)
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 24864)
-- Name: comment_commentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE comment_commentid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_commentid_seq OWNER TO postgres;

--
-- TOC entry 2261 (class 0 OID 0)
-- Dependencies: 176
-- Name: comment_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE comment_commentid_seq OWNED BY comment.commentid;


--
-- TOC entry 179 (class 1259 OID 24884)
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE feedback (
    feedbackid integer NOT NULL,
    message character(300),
    email character varying
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 24882)
-- Name: feedback_feedbackid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE feedback_feedbackid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_feedbackid_seq OWNER TO postgres;

--
-- TOC entry 2262 (class 0 OID 0)
-- Dependencies: 178
-- Name: feedback_feedbackid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE feedback_feedbackid_seq OWNED BY feedback.feedbackid;


--
-- TOC entry 175 (class 1259 OID 24845)
-- Name: item; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item (
    itemid integer NOT NULL,
    itemname character varying NOT NULL,
    description character varying NOT NULL,
    userid bigint,
    locationitem character varying,
    city character varying,
    itemstatus character varying,
    itemdate date,
    itempicture character varying,
    itemsuccessdate date,
    enablenotification boolean,
    itemviews bigint,
    thumbsdown bigint,
    categoryid integer
);


ALTER TABLE public.item OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 24843)
-- Name: item_itemid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_itemid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_itemid_seq OWNER TO postgres;

--
-- TOC entry 2263 (class 0 OID 0)
-- Dependencies: 174
-- Name: item_itemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_itemid_seq OWNED BY item.itemid;


--
-- TOC entry 171 (class 1259 OID 24826)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    userid integer NOT NULL,
    firstname character(30),
    lastname character(30),
    email character(40),
    phone character(12),
    passkey character(20)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 170 (class 1259 OID 24824)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO postgres;

--
-- TOC entry 2264 (class 0 OID 0)
-- Dependencies: 170
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_userid_seq OWNED BY users.userid;


--
-- TOC entry 2117 (class 2604 OID 24837)
-- Name: categoryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN categoryid SET DEFAULT nextval('category_categoryid_seq'::regclass);


--
-- TOC entry 2119 (class 2604 OID 24869)
-- Name: commentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment ALTER COLUMN commentid SET DEFAULT nextval('comment_commentid_seq'::regclass);


--
-- TOC entry 2120 (class 2604 OID 24887)
-- Name: feedbackid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY feedback ALTER COLUMN feedbackid SET DEFAULT nextval('feedback_feedbackid_seq'::regclass);


--
-- TOC entry 2118 (class 2604 OID 24848)
-- Name: itemid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item ALTER COLUMN itemid SET DEFAULT nextval('item_itemid_seq'::regclass);


--
-- TOC entry 2116 (class 2604 OID 24829)
-- Name: userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN userid SET DEFAULT nextval('users_userid_seq'::regclass);


--
-- TOC entry 2245 (class 0 OID 24834)
-- Dependencies: 173
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY category (categoryid, categoryname) FROM stdin;
1	Electronics
2	Clothes
3	Books
4	Other
\.


--
-- TOC entry 2265 (class 0 OID 0)
-- Dependencies: 172
-- Name: category_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_categoryid_seq', 88, true);


--
-- TOC entry 2249 (class 0 OID 24866)
-- Dependencies: 177
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY comment (commentid, userid, itemid, usercomment) FROM stdin;
1	1	1	Commentq                                                                                                                                                                                                
2	2	1	comment2                                                                                                                                                                                                
3	4	2	comment1                                                                                                                                                                                                
4	5	2	comment2                                                                                                                                                                                                
5	3	3	comment1                                                                                                                                                                                                
\.


--
-- TOC entry 2266 (class 0 OID 0)
-- Dependencies: 176
-- Name: comment_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('comment_commentid_seq', 1, false);


--
-- TOC entry 2251 (class 0 OID 24884)
-- Dependencies: 179
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY feedback (feedbackid, message, email) FROM stdin;
\.


--
-- TOC entry 2267 (class 0 OID 0)
-- Dependencies: 178
-- Name: feedback_feedbackid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('feedback_feedbackid_seq', 1, false);


--
-- TOC entry 2247 (class 0 OID 24845)
-- Dependencies: 175
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY item (itemid, itemname, description, userid, locationitem, city, itemstatus, itemdate, itempicture, itemsuccessdate, enablenotification, itemviews, thumbsdown, categoryid) FROM stdin;
1	Jacket	Lo Encontre en el  Lobby	1	Stefanie	Mayguez	Found	2014-11-11	http://www.vivetumoto.com/foros/attachments/chaquetas-motociclistas/2873d1356133608t-vendo-hermosa-chaqueta-icon-overlord-typer-1-dsc_0473-1-.jpg	\N	\N	5	0	2
2	Tablet	Mi tablet estaba en el Bano de mujeres	3	Stefanie	Mayguez	Lost	2014-11-11	http://i00.i.aliimg.com/photo/v0/353397906/10_inch_TABLET_PC_Talet_computer_10.jpg	\N	\N	11	0	1
3	Camera	Mi camera es roja	4	Fisica	Mayaguez	Found	2014-04-05	http://static.photo.net/v3graphics/20140428/equipment/medium/2964.jpg	\N	\N	10	\N	1
4	Hat	Small hat	1	Monzon	Mayaguez	Lost	2013-10-11	https://cdn.usetopscore.com/uploads/93/media_items/chic-pink-cowgirl-hat.original.jpg	\N	\N	10000	3	2
\.


--
-- TOC entry 2268 (class 0 OID 0)
-- Dependencies: 174
-- Name: item_itemid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('item_itemid_seq', 1, false);


--
-- TOC entry 2243 (class 0 OID 24826)
-- Dependencies: 171
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (userid, firstname, lastname, email, phone, passkey) FROM stdin;
1	Maria                         	Rivera                        	maria.rivera30@upr.edu                  	787635515   	858                 
2	luis                          	Rivera                        	luis.rivera30@upr.edu                   	787635515   	858                 
3	Angel                         	De La Torre                   	Angel.rivera30@upr.edu                  	787635515   	858                 
4	Irving                        	Ramirez                       	Irving.rivera30@upr.edu                 	787635515   	858                 
5	Amir                          	Chinaei                       	amir@upr.edu                            	7876757484  	1233                
\.


--
-- TOC entry 2269 (class 0 OID 0)
-- Dependencies: 170
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_userid_seq', 1, false);


--
-- TOC entry 2124 (class 2606 OID 24842)
-- Name: category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (categoryid);


--
-- TOC entry 2128 (class 2606 OID 24871)
-- Name: comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (commentid);


--
-- TOC entry 2130 (class 2606 OID 24892)
-- Name: feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (feedbackid);


--
-- TOC entry 2126 (class 2606 OID 24853)
-- Name: item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY item
    ADD CONSTRAINT item_pkey PRIMARY KEY (itemid);


--
-- TOC entry 2122 (class 2606 OID 24831)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 2133 (class 2606 OID 24872)
-- Name: comment_itemid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_itemid_fkey FOREIGN KEY (itemid) REFERENCES item(itemid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2134 (class 2606 OID 24877)
-- Name: comment_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_userid_fkey FOREIGN KEY (userid) REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2131 (class 2606 OID 24854)
-- Name: item_categoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item
    ADD CONSTRAINT item_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES category(categoryid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2132 (class 2606 OID 24859)
-- Name: item_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item
    ADD CONSTRAINT item_userid_fkey FOREIGN KEY (userid) REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2258 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2014-10-24 23:09:25 AST

--
-- PostgreSQL database dump complete
--

