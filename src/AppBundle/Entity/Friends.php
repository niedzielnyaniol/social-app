<?php
/**
 * Created by PhpStorm.
 * User: Maciek
 * Date: 25.02.2018
 * Time: 09:32
 */

namespace AppBundle\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="friends")
 */
class Friends
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="requestsSend")
     * @ORM\JoinColumn(name="user_send_id")
     */
    private $userWhoSend;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="invitations")
     * @ORM\JoinColumn(name="user_recipient_id")
     */
    private $requestRecipient;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return mixed
     */
    public function getUserWhoSend()
    {
        return $this->userWhoSend;
    }

    /**
     * @param mixed $userWhoSend
     */
    public function setUserWhoSend($userWhoSend)
    {
        $this->userWhoSend = $userWhoSend;
    }

    /**
     * @return mixed
     */
    public function getRequestRecipient()
    {
        return $this->requestRecipient;
    }

    /**
     * @param mixed $requestRecipient
     */
    public function setRequestRecipient($requestRecipient)
    {
        $this->requestRecipient = $requestRecipient;
    }
}