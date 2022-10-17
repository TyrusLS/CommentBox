import express from 'express';
import controller from '../controllers/comment';

const router = express.Router();

router.post('/create/comment', controller.createComment);
router.get('/get/comments', controller.getAllComments);

export = router;
