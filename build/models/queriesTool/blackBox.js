"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queriesBlackBox = void 0;
exports.queriesBlackBox = {
    BLACK_BOX_QUERY: "select m.product_id,product_category_name,review_score,price,counts\n  from(select product_id,count( product_id) as counts \n  from products\n  where product_category_name=$4\n  and price between $1 and $2\n  and review_score= $3\n  and order_approved_at between '2017-10-2' and '2018-08-6'\n  group by product_id )m\n  , (select  product_id,product_category_name,price,review_score,order_approved_at\n  from(select row_number() over(PARTITION BY product_id order by order_approved_at desc)as ranks,product_id,product_category_name,price,review_score,order_approved_at\n  from products\n  where product_category_name=$4\n  and price between $1 and $2\n  and review_score= $3\n  and order_approved_at between '2017-10-2' and '2018-08-6')s\n  where ranks=1 )u\n  where m.product_id=u.product_id \n  order by counts desc"
};
