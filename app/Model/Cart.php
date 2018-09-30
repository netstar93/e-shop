<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\Helpers;
class Cart extends Model
{
    protected $table = 'cart';
    protected $primaryKey = 'item_id';
    public $timestamps  = false;
    protected $_cart;
    public function _construct(){
        $_cart = session('cart_items');
        dd($_cart);
    }

    public function getItem(){
        return $this->_cart;
    }

    public function getItemCount(){
        return count($this->_cart);
    }
}
