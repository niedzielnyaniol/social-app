<?php
/**
 * Created by PhpStorm.
 * User: Maciek
 * Date: 25.02.2018
 * Time: 12:47
 */

namespace AppBundle\Repository;


use Doctrine\ORM\EntityRepository;

class FriendRequestRepository extends EntityRepository
{
    public function areInvited($u1, $u2) {
        $opt1 = $this->findOneBy([
            'userRecipient' => $u1,
            'userSend' => $u2,
        ]);
        $opt2 = $this->findOneBy([
            'userSend' => $u1,
            'userRecipient' => $u2
        ]);

        return isset($opt1) || isset($opt2);
    }
}