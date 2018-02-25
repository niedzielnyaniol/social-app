<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Friends;
use AppBundle\Entity\FriendsRequest;
use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class FriendController extends Controller
{
    /**
     * @Route("/invite/send/{id}", name="invite_user")
     */
    public function sendInviteAction(User $user)
    {
        $em = $this->getDoctrine()->getManager();
        $invite = new FriendsRequest();

        $invite->setCreatedAt(new \DateTime());
        $invite->setUserSend($this->getUser());
        $invite->setUserRecipient($user);

        $em->persist($invite);
        $em->flush();

        $this->addFlash('success', 'Your invitation has been sent');

        return $this->redirectToRoute('user_show', [ 'id' => $user->getId() ]);
    }

    /**
     * @Route("api/invite/send", name="api_invite_user")
     */
    public function apiSendInviteAction(Request $request)
    {
        $content = $request->getContent();
        $params = json_decode($content, true);
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('AppBundle:User')->find($params['id']);
        $invite = new FriendsRequest();

        $invite->setCreatedAt(new \DateTime());
        $invite->setUserSend($this->getUser());
        $invite->setUserRecipient($user);

        $em->persist($invite);
        $em->flush();

        return new JsonResponse([
            'success' => true,
        ]);
    }

    /**
     * @Route("/invite/accept/{id}", name="accept_invite")
     */
    public function acceptInviteAction(User $user)
    {
        $em = $this->getDoctrine()->getManager();

        $invite = $em->getRepository('AppBundle:FriendsRequest')->findBy([
            'userSend' => $user,
            'userRecipient' => $this->getUser(),
        ]);

        $friendship = new Friends();
        $friendship->setUser1($user);
        $friendship->setUser2($this->getUser());
        $friendship->setCreatedAt(new \DateTime());

        $em->persist($friendship);
        foreach ($invite as $i) {
            $em->remove($i);
        }
        $em->flush();

        $this->addFlash('success', 'You are friends now!');

        return $this->redirectToRoute('user_show', [ 'id' => $user->getId() ]);
    }

    /**
     * @Route("api/invite/accept", name="api_accept_invite")
     */
    public function apiAcceptInviteAction(Request $request)
    {
        $content = $request->getContent();
        $params = json_decode($content, true);
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('AppBundle:User')->find($params['id']);

        $invite = $em->getRepository('AppBundle:FriendsRequest')->findBy([
            'userSend' => $user,
            'userRecipient' => $this->getUser(),
        ]);

        $friendship = new Friends();
        $friendship->setUser1($user);
        $friendship->setUser2($this->getUser());
        $friendship->setCreatedAt(new \DateTime());

        $em->persist($friendship);
        foreach ($invite as $i) {
            $em->remove($i);
        }
        $em->flush();

        return new JsonResponse([
            'success' => true,
        ]);;
    }
}
