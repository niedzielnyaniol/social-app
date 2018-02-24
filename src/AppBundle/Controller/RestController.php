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

        $response->setData(array(
            'id' => $user->getId(),
            'name' => $user->getFirstName(),
            'surname' => $user->getLastName(),
            'email' => $user->getEmail(),
            'avatarUri' => $user->getAvatarUri(),
        ));
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

        $response->setData(array(
            'id' => $user->getId(),
            'name' => $user->getFirstName(),
            'surname' => $user->getLastName(),
            'email' => $user->getEmail(),
            'avatarUri' => $user->getAvatarUri(),
        ));
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}
