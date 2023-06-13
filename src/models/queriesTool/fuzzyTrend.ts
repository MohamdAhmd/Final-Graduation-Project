export const querysFuzzyTrend = {
  FUZZY_TREND1_QUERY: `select  product_category_name,count(product_id) as counts
  from products 
   where order_approved_at between $1 and $2
    group by product_category_name 	
    order by counts desc`,
  FUZZY_TREND2_QUERY: `select product_id,count(product_id) as counts
    from products 
     where order_approved_at between $1 and $2
      group by product_id	
      order by counts desc`,
  FUZZY_TREND3_QUERY: `select  product_id,count(product_id) as counts
      from products 
       where order_approved_at between $1 and $2
       and product_category_name =$3
        group by product_id	
        order by counts desc`
}
