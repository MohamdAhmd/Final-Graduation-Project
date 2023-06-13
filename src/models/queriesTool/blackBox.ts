export const queriesBlackBox = {
  BLACK_BOX_QUERY: `select m.product_id,product_category_name,review_score,price,counts
  from(select product_id,count( product_id) as counts 
  from products
  where product_category_name=$4
  and price between $1 and $2
  and review_score= $3
  and order_approved_at between '2017-10-2' and '2018-08-6'
  group by product_id )m
  , (select  product_id,product_category_name,price,review_score,order_approved_at
  from(select row_number() over(PARTITION BY product_id order by order_approved_at desc)as ranks,product_id,product_category_name,price,review_score,order_approved_at
  from products
  where product_category_name=$4
  and price between $1 and $2
  and review_score= $3
  and order_approved_at between '2017-10-2' and '2018-08-6')s
  where ranks=1 )u
  where m.product_id=u.product_id 
  order by counts desc`
}
