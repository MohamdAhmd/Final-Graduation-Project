"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querysFuzzyTrend = void 0;
exports.querysFuzzyTrend = {
    FUZZY_TREND1_QUERY: "select  product_category_name,count(product_id) as counts\n  from products \n   where order_approved_at between $1 and $2\n    group by product_category_name \t\n    order by counts desc",
    FUZZY_TREND2_QUERY: "select product_id,count(product_id) as counts\n    from products \n     where order_approved_at between $1 and $2\n      group by product_id\t\n      order by counts desc",
    FUZZY_TREND3_QUERY: "select  product_id,count(product_id) as counts\n      from products \n       where order_approved_at between $1 and $2\n       and product_category_name =$3\n        group by product_id\t\n        order by counts desc"
};
