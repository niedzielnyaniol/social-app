<?php
/**
 * Created by PhpStorm.
 * User: Maciek
 * Date: 25.02.2018
 * Time: 12:46
 */

namespace AppBundle\Repository;


use Doctrine\ORM\EntityRepository;

class FriendRepository extends EntityRepository
{
    public function areFriends($u1, $u2) {
        $opt1 = $this->findOneBy([
            'user1' => $u1,
            'user2' => $u2,
        ]);
        $opt2 = $this->findOneBy([
            'user2' => $u1,
            'user1' => $u2
        ]);

        return isset($opt1) || isset($opt2);
    }
}