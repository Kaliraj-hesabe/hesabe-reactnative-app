package com.cuberto.liquid_swipe

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.ViewTreeObserver
import androidx.annotation.DrawableRes
import androidx.annotation.Px
import androidx.core.view.drawToBitmap
import androidx.viewpager.widget.PagerAdapter
import androidx.viewpager.widget.ViewPager
import com.cuberto.liquid_swipe.animation.Direction.LEFT
import com.cuberto.liquid_swipe.animation.LeftEdgeController
import com.cuberto.liquid_swipe.animation.RightEdgeController

class LiquidPager : ViewPager, ViewTreeObserver.OnDrawListener, ViewI {

    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        buttonDrawableId = context.obtainStyledAttributes(attrs, R.styleable.LiquidPager)
            .getResourceId(R.styleable.LiquidPager_button_drawable, R.drawable.ic_button)

        buttonDrawableId1 = context.obtainStyledAttributes(attrs, R.styleable.LiquidPager)
            .getResourceId(R.styleable.LiquidPager_button_drawable, R.drawable.ic_right_tutorial_1)

        buttonDrawableId2 = context.obtainStyledAttributes(attrs, R.styleable.LiquidPager)
            .getResourceId(R.styleable.LiquidPager_button_drawable, R.drawable.ic_right_tutorial_2)

        buttonDrawableId3 = context.obtainStyledAttributes(attrs, R.styleable.LiquidPager)
            .getResourceId(R.styleable.LiquidPager_button_drawable, R.drawable.ic_right_tutorial_3)
    }

    private var leftEdgeController: LeftEdgeController? = null
    private var rightEdgeController: RightEdgeController? = null
    private var inputBlocked = false
    private var buttonDrawableId = R.drawable.ic_button
    private var buttonDrawableId1 = R.drawable.ic_right_tutorial_1
    private var buttonDrawableId2 = R.drawable.ic_right_tutorial_2
    private var buttonDrawableId3 = R.drawable.ic_right_tutorial_3

    init {
        setWillNotDraw(false)
        viewTreeObserver.addOnDrawListener(this)
        addOnPageChangeListener(object : OnPageChangeListener {
            override fun onPageScrollStateChanged(state: Int) {}

            override fun onPageSelected(position: Int) {
                invalidate()
                leftEdgeController?.onPageChanged(position)
                rightEdgeController?.onPageChanged(position)
            }

            override fun onPageScrolled(
                position: Int,
                positionOffset: Float, @Px positionOffsetPixels: Int
            ) {
            }
        })
    }

    public fun setButtonDrawable(@DrawableRes drawableId: Int) {
        buttonDrawableId = drawableId
        rightEdgeController?.setButtonDrawable(resources.getDrawable(buttonDrawableId1, null))
    }

    //ViewI methods

    override fun getCount(): Int {
        return adapter?.count ?: 0
    }

    override fun getBitmap(direction: Int): Bitmap? {
        if (direction == LEFT) {
            return getBitmapAt(currentItem - 1)
        } else {
            return getBitmapAt(currentItem + 1)
        }
    }

    override fun getBitmapAt(position: Int): Bitmap? {
        return getChildAt(position)?.drawToBitmap()
    }

    override fun redraw() {
        invalidate()
    }

    override fun switchPage(direction: Int) {
        val newCurrentItem = if (direction == LEFT) currentItem + 1 else currentItem - 1

        when (newCurrentItem) {
            0 -> {
                rightEdgeController?.setButtonDrawable(resources.getDrawable(buttonDrawableId1, null))
            }
            1 -> {
                rightEdgeController?.setButtonDrawable(resources.getDrawable(buttonDrawableId2, null))
            }
            2 -> {
                rightEdgeController?.setButtonDrawable(resources.getDrawable(buttonDrawableId3, null))
            }
            else -> {
                rightEdgeController?.setButtonDrawable(null)
            }
        }

        setCurrentItem(newCurrentItem, false)
    }

    override fun blockInput(block: Boolean) {
        inputBlocked = block
    }

    //View methods

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)

        val density = resources.displayMetrics.density
        leftEdgeController = LeftEdgeController(w, h, 0f, density, this)
        rightEdgeController = RightEdgeController(w, h, 0f, density, this)
        rightEdgeController?.setButtonDrawable(resources.getDrawable(buttonDrawableId1, null))
    }

    override fun onTouchEvent(ev: MotionEvent): Boolean {
        if (!inputBlocked) {
            when (ev.action) {
                MotionEvent.ACTION_DOWN -> {
                    val left = leftEdgeController?.onDownTouch(ev) ?: false
                    val right = rightEdgeController?.onDownTouch(ev) ?: false
                    return left || right
                }
                MotionEvent.ACTION_UP -> {
                    val left = leftEdgeController?.onUpTouch(ev) ?: false
                    val right = rightEdgeController?.onUpTouch(ev) ?: false
                    return left || right
                }
                MotionEvent.ACTION_MOVE -> {
                    val left = leftEdgeController?.onMoveTouch(ev) ?: false
                    val right = rightEdgeController?.onMoveTouch(ev) ?: false
                    return left || right
                }
            }
        }
        return false
    }

    override fun onDrawForeground(canvas: Canvas?) {
        super.onDrawForeground(canvas)
        leftEdgeController?.drawEdge(canvas)
        rightEdgeController?.drawEdge(canvas)
    }

    override fun dispatchDraw(canvas: Canvas?) {
        super.dispatchDraw(canvas)
        leftEdgeController?.drawEdge(canvas)
        rightEdgeController?.drawEdge(canvas)
    }

    override fun onDraw() {
        if (leftEdgeController?.hasBitmap() ?: false || rightEdgeController?.hasBitmap() ?: false) {
            return
        } else {
            leftEdgeController?.onPageChanged(currentItem)
            rightEdgeController?.onPageChanged(currentItem)
        }
    }

    override fun setOffscreenPageLimit(limit: Int) {
        super.setOffscreenPageLimit(getCount())
    }

    override fun setAdapter(adapter: PagerAdapter?) {
        super.setAdapter(adapter)
        offscreenPageLimit = getCount()
    }
}