<?php
/**
 * Created by PhpStorm.
 * User: Maciek
 * Date: 25.02.2018
 * Time: 12:46
 */

namespace AppBundle\Repository;


use AppBundle\Entity\Friends;
use AppBundle\Entity\User;
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

    public function getFriends(User $user) {
        $f1 = $this->findBy([
            'user1' => $user
        ]);

        $f2 = $this->findBy([
            'user2' => $user
        ]);

        $result =[];
        /** @var Friends $item */
        foreach ($f1 as $item) {
            array_push($result, $item->getUser2());
        }
        /** @var Friends $item */
        foreach ($f2 as $item) {
            array_push($result, $item->getUser2());
        }

        return $result;
    }
}