<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class RestController extends Controller
{
    /**
     * @Route("/api/user", name="api_user")
     */
    public function getUserAction()
    {
        /** @var User $user */
        $user = $this->getUser();
        $response = new JsonResponse();

        $response->setData($user->getRest());
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @Route("/api/user/{email}", name="api_user_email")
     */
    public function userByEmailAction($email)
    {
        $em = $this->getDoctrine()->getManager();
        /** @var User $user */
        $user = $em->getRepository('AppBundle:User')->findOneBy([
            'email' => $email
        ]);
        $response = new JsonResponse();

        $response->setData($user->getRest());
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @param User $user
     * @return array
     */
    private function printUsers($user) {
        return $user->getRest();
    }

    /**
     * @Route("/api/table-info", name="api_table-info")
     */
    public function getTableInfoAction()
    {
        /** @var User $user */
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();

        $retUsers = array();
        $users = $em->getRepository('AppBundle:User')->findAll();

        for ($i = 0; count($retUsers) < 3; $i++) {
            if (!$em->getRepository('AppBundle:Friends')->areFriends($users[$i], $user)
                && $users[$i]->getId() !== $user->getId()
                && !$em->getRepository('AppBundle:FriendsRequest')->areInvited($users[$i], $user)
            ) {
                array_push($retUsers, $users[$i]->getRest());
            }
        }

        return new JsonResponse([
            'propsedUsers' => $retUsers
        ]);
    }
}
